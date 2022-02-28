import profile
from this import d
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from drf_extra_fields.fields import Base64ImageField
from rest_framework.authtoken.models import Token
from cryptography.fernet import Fernet
from .email_utils import send_mail_user
from clinics.serializers import ClinicSerializer

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=False)
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','password')
        read_only_fields = ['id']
    

    def update(self, instance, validated_data):
        for key in validated_data:
            if key in self.fields:
                if key != 'password':
                    setattr(instance,key,validated_data.get(key))
                else:
                    instance.set_password(validated_data.get(key))
        instance.save()
        return instance


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

######### Public Profile Serialziers ##########
class ProfilePublicSerializer(serializers.ModelSerializer):
    picture = Base64ImageField(required=False)
    class Meta:
        model = Profile
        exclude = ['user']

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

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(instance.user,data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        for key in validated_data:
            if key in self.fields:
                    setattr(instance,key,validated_data.get(key))
        instance.save()
        return instance
        

######### doctor serialziers ##########
class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ('name',)

class DoctorSerializer(serializers.ModelSerializer):
    syndicate_id=Base64ImageField()
    specialization=SpecializationSerializer(many=True)
    clinics = ClinicSerializer(many=True,required=False)
    profile = ProfileSerializer()

    class Meta:
        model = Doctor
        fields = ('is_varified','description','syndicate_id','national_id','specialization','profile','clinics')
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
        profile_data = validated_data.pop('profile')
        profile_serializer = ProfileSerializer(instance.profile,data=profile_data)
        profile_serializer.is_valid(raise_exception=True)
        profile = profile_serializer.save()
        Doctor.objects.update(id=instance.id,**validated_data)
        updatedoctor = Doctor.objects.get(id=instance.id)
        return updatedoctor

        


class DoctorPublicSerializer(serializers.ModelSerializer):
    user = UserPublicInfoSerializer()
    profile=ProfilePublicSerializer()
    class Meta:
        model = Doctor
        fields = ('user','description','profile')
        depth = 1


class DoctorRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorRating
        fields = '__all__'
######### doctor serialziers ##########
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'
######### doctor serialziers ##########
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appiontments
        fields = '__all__'