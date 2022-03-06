from rest_framework import serializers
from .models import *
from drf_extra_fields.fields import Base64ImageField


class ClinicSerializer(serializers.ModelSerializer):
    tax_registration = Base64ImageField(required=False)
    technical_registration = Base64ImageField(required=False)
    class Meta:
        model = Clinic
        fields = '__all__'
        read_only_fields = ['is_verified']
        depth = 1

    def create(self, validated_data):
        images = self.context.get('request').data.get('images')
        clinic = Clinic.objects.create(**validated_data)
        for image in images:
            clinic_image_serializer = ClinicImageSerializer(data={'picture':image})
            if clinic_image_serializer.is_valid():
                clinic_image_serializer.save(clinic=clinic)
            else:
                clinic.delete()
                raise serializers.ValidationError("there was a problem with an image")
        return clinic

class ClinicImageSerializer(serializers.ModelSerializer):
    picture = Base64ImageField()
    class Meta:
        model = ClinicPicture
        fields = '__all__'
        depth = 1
       

# class ClinicDoctorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ClinicDoctor
#         fields = '__all__'
#         depth = 1
       