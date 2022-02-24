from rest_framework import serializers
from .models import *
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password')