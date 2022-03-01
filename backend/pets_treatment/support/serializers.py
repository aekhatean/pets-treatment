from rest_framework import serializers
from .models import ContactSupport

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSupport
        fields = '__all__'