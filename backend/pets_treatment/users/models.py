from django.db import models
from django.contrib.auth.models import User
from clinics.models import Clinic
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False
User.REQUIRED_FIELDS= ['username']
User.USERNAME_FIELD = 'email'

#Create your models here

######################## doctor models ############################

# files uploading functions
def synd_upload(instance, filename):
    extension = filename.split(".")[1]
    return "users/doctors/%s/syndid.%s" % (instance.user.id, extension)

# Specialization (id , name) 
class Specialization(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

# Doctor (id, user(one2one), is_varified(manual bool),  syndicate_id(file), national_id, description) 
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=1000,blank=True,null=True)
    syndicate_id = models.FileField(upload_to=synd_upload,null=True)
    national_id = models.CharField(max_length=1000)
    is_varified = models.BooleanField(default=False)
    specialization = models.ManyToManyField(Specialization)
    clinics = models.ManyToManyField(Clinic,through='DoctorClinics')

    def __str__(self):
        return str(self.user.first_name)






# Doctor Clinic Rel
class DoctorClinics(models.Model):
     clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
     clinic_owner = models.BooleanField(default=False)
# Doctor rating
class DoctorRating(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    details = models.CharField(max_length=600)
    
    class Meta:
        db_table = 'doctor_rating'
        unique_together = (('doctor', 'user'),)



######################## Profile Models ############################

def profile_image_upload(instance, filename):
    return f'profile_images/{instance.user.id}/{filename}'

class Profile(models.Model):
    DOCTOR = 'DR'
    PATIENT = 'PT'
    ROLE_CHOICES = [
        (PATIENT, 'Pet Owner'),
        (DOCTOR, 'Doctor'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    area = models.CharField(max_length=40)
    phone = models.CharField(max_length=20)
    picture = models.ImageField(upload_to= profile_image_upload)
    role = models.CharField(
        max_length=2,
        choices=ROLE_CHOICES,
        default=PATIENT,
    )

