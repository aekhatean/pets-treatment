from typing_extensions import Required
from rest_framework import serializers
from .models import *


class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = '__all__'
        read_only_fields = ['is_verified', 'clinic_owner']
        depth = 1

class ClinicImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicPicture
        fields = '__all__'
        depth = 1
       

class ClinicDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicDoctor
        fields = '__all__'
        depth = 1
       