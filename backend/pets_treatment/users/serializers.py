from this import d
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from drf_extra_fields.fields import Base64ImageField
from rest_framework.authtoken.models import Token
from cryptography.fernet import Fernet
from .email_utils import send_mail_user

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','password')
        read_only_fields = ['id']

class TokenSerializer(serializers.Serializer):
    email = serializers.CharField(
        write_only=True
    )
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )
    token = serializers.CharField(
        read_only=True
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                username=email, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


##### user public info ###############
class UserPublicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name')

######### Profile Serialziers ##########

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    picture = Base64ImageField(required=False)
    class Meta:
        model = Profile
        fields = '__all__'


    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data,is_active=False)
        profile= Profile.objects.create(**validated_data,user=user)
        return profile

######### doctor serialziers ##########
class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ('name',)

class DoctorSerializer(serializers.ModelSerializer):
    # specialization = serializers.SerializerMethodField('doctor_specialties')
    # def doctor_specialties(self, instance):
    #     return DoctorSpecializationSerializer(DoctorSpecialization.objects.filter(doctor=instance),many=True).data
    syndicate_id=Base64ImageField()
    specialization=SpecializationSerializer(many=True)
    profile = ProfileSerializer()

    class Meta:
        model = Doctor
        fields = ('is_varified','description','syndicate_id','national_id','specialization','profile')
        read_only_fields = ['is_varified']
        depth = 1


    def create(self, validated_data):
        specialization_data = validated_data.pop('specialization')
        profile = validated_data.pop('profile')
        profile_serializer = ProfileSerializer(data=profile)
        profile_serializer.is_valid(raise_exception=True)
        profile = profile_serializer.save()
        doctor = Doctor.objects.create(user=profile.user,profile=profile,**validated_data)
        for spec in specialization_data:
            spec_inst = Specialization.objects.get(name=dict(spec)['name'])
            Doctor.objects.get(user=profile.user).specialization.add(spec_inst)
        token, created = Token.objects.get_or_create(user=doctor.user)
        key = Fernet.generate_key()
        fernet = Fernet(key)
        enc_token = fernet.encrypt(token.key.encode())
        activation_link = f"http://127.0.0.1:8000/users/{key.decode()}/{enc_token.decode()}"
        send_mail_user(doctor.user.first_name,activation_link,doctor.user.email)
        newdoctor = Doctor.objects.get(user=profile.user)
        return newdoctor

    def update(self, instance, validated_data):
        specialization_data = validated_data.pop('specialization')
        Doctor.objects.get(id=instance.id).specialization.clear()
        for spec in specialization_data:
            spec_inst = Specialization.objects.get(name=dict(spec)['name'])
            Doctor.objects.get(id=instance.id).specialization.add(spec_inst)
        Doctor.objects.update(id=instance.id,**validated_data)
        updatedoctor = Doctor.objects.get(id=instance.id)
        return updatedoctor

        


class DoctorPublicSerializer(serializers.ModelSerializer):
    user = UserPublicInfoSerializer()

    # specialization = serializers.SerializerMethodField('doctor_specialties')
    # def doctor_specialties(self, instance):
    #     return DoctorSpecializationSerializer(DoctorSpecialization.objects.filter(doctor=instance),many=True).data
    class Meta:
        model = Doctor
        fields = ('user','description')
        depth = 1


    








