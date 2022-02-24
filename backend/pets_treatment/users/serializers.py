import profile
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

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
    class Meta:
        model = Doctor
        fields = '__all__'
        depth = 1

class DoctorPublicSerializer(serializers.ModelSerializer):
    user = UserPublicInfoSerializer()
    class Meta:
        model = Doctor
        fields = ('user','description')
        depth = 1

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'
    
class DoctorSpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSpecialization
        fields = '__all__'

######### Profile Serialziers ##########

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = '__all__'


    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        user = User.objects.create_user(username=username,password=password)
        profile= Profile.objects.create(**validated_data,user=user)
        return profile

    # def update(self, instance, validated_data):
    #     users = validated_data.pop('users')
    #     instance.phone = validated_data.get("phone", instance.phone)
    #     instance.save()
    #     keep_users = []
    #     for user in users:
    #         if "id" in user.keys():
    #             if User.objects.filter(id=user["id"]).exists():
    #                 c = User.objects.get(id=user["id"])
    #                 c.text = user.get('text', c.text)
    #                 c.save()
    #                 keep_users.append(c.id)
    #             else:
    #                 continue
    #         else:
    #             c = User.objects.create(**user, profile=instance)
    #             keep_users.append(c.id)

    #     for user in instance.users:
    #         if user.id not in keep_users:
    #             user.delete()

    #     return instance

    