from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from drf_extra_fields.fields import Base64ImageField

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password')

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


######### doctor serialziers ##########
class DoctorSerializer(serializers.ModelSerializer):
    specialization = serializers.SerializerMethodField('doctor_specialties')
    def doctor_specialties(self, instance):
        return DoctorSpecializationSerializer(DoctorSpecialization.objects.filter(doctor=instance),many=True).data
    class Meta:
        model = Doctor
        fields = ('user','is_varified','description','syndicate_id','national_id','specialization')
        read_only_fields = ['is_varified']
        depth = 1

class DoctorPublicSerializer(serializers.ModelSerializer):
    user = UserPublicInfoSerializer()
    specialization = serializers.SerializerMethodField('doctor_specialties')
    def doctor_specialties(self, instance):
        return DoctorSpecializationSerializer(DoctorSpecialization.objects.filter(doctor=instance),many=True).data
    class Meta:
        model = Doctor
        fields = ('user','description','specialization')
        depth = 1

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ('name',)
    
class DoctorSpecializationSerializer(serializers.ModelSerializer):
    specialization = SpecializationSerializer()
    class Meta:
        model = DoctorSpecialization
        fields = ('specialization',)
        depth = 1

######### Profile Serialziers ##########

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    picture = Base64ImageField()
    class Meta:
        model = Profile
        fields = '__all__'


    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data,is_active=False)
        profile= Profile.objects.create(**validated_data,user=user)
        return profile





