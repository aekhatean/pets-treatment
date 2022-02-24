from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name','email','password')
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