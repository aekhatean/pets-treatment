from unicodedata import name
from django.db import models
from django.conf import settings

# Clinic (id, name, address, area, city, country , phone, is_varified(manual bool),
#  tax_registration(file), technical_registration(file), technical_registration_number, 
#  price, clinic_owner)

# files uploading functions
def tax_upload(instance, filename):
    extension = filename.split(".")[1]
    return "clinics/tax/%s/taxid.%s" % (instance.clinic.id, extension)

def tech_upload(instance, filename):
    extension = filename.split(".")[1]
    return "clinics/tech/%s/techid.%s" % (instance.clinic.id, extension)


class Clinic(models.Model):
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=100)
    area = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    country = models.CharField(max_length=40)
    phone = models.CharField(max_length=20) # edit after discuss
    is_verified = models.BooleanField(default=False)
    tax_registration = models.FileField(upload_to=tax_upload,null=True)
    technical_registration = models.FileField(upload_to=tech_upload,null=True)
    technical_registration_number = models.CharField(max_length=100) # edit after discuss
    price = models.IntegerField()
    clinic_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


def image_upload(instance, filename):
    return f'clinic_images/{instance.clinic.id}/{filename}'

class ClinicPicture(models.Model):
    picture = models.ImageField(upload_to= image_upload)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE, related_name='images')