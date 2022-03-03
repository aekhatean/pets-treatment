from unicodedata import name
from django.db import models
from django.conf import settings
import re
from django.core.exceptions import ValidationError

from users.models import *

# Clinic (id, name, address, area, city, country , phone, is_varified(manual bool),
#  tax_registration(file), technical_registration(file), technical_registration_number, 
#  price, clinic_owner)

# files uploading functions
def tax_upload(instance, filename):
    extension = filename.split(".")[1]
    return "clinics/%s/taxid.%s" % (instance.id, extension)

def tech_upload(instance, filename):
    extension = filename.split(".")[1]
    return "clinics/%s/techid.%s" % (instance.id, extension)

def image_upload(instance, filename):
    return f'clinics/{instance.id}/galary/{filename}'

# egyptian phone number validation
def validate_egyptian_number(value):
    if not any(re.match(pattern, value) for pattern in [r"011+[0-9]{8}", r"012+[0-9]{8}", r"015+[0-9]{8}",r"010+[0-9]{8}"]):
        raise ValidationError(
            ('%(value)s is not a valid egyptian number'),
            params={'value': value},
        )
######################## Clinic Models ############################
class Clinic(models.Model):
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=100)
    area = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    country = models.CharField(max_length=40)
    phone = models.CharField(max_length=11,null=True,validators=[validate_egyptian_number],error_messages ={
                    "required":"this is not a valid egyptian number"
                    })
    is_verified = models.BooleanField(default=False)
    tax_registration = models.FileField(upload_to=tax_upload,null=True)
    technical_registration = models.FileField(upload_to=tech_upload,null=True)
    technical_registration_number = models.CharField(max_length=100) # edit after discuss
    price = models.IntegerField()
######################## ClinicPicture Models ############################
class ClinicPicture(models.Model):
    picture = models.ImageField(upload_to= image_upload)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE, related_name='images')
    
