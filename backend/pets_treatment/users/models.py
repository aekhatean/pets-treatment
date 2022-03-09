from django.db import models
from django.contrib.auth.models import User
from clinics.models import Clinic
User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False
User.REQUIRED_FIELDS= ['username']
User.USERNAME_FIELD = 'email'

#Create your models here


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


######################## doctor models ############################

def synd_upload(instance, filename):
    extension = filename.split(".")[1]
    return "users/doctors/%s/syndid.%s" % (instance.user.id, extension)
######################## Specialization Models ############################

class Specialization(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

######################## Doctor Models ############################
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=1000,blank=True,null=True)
    syndicate_id = models.ImageField(upload_to=synd_upload,null=True)
    national_id = models.CharField(max_length=14,unique=True)
    is_varified = models.BooleanField(default=False)
    specialization = models.ManyToManyField(Specialization)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    clinics = models.ManyToManyField(Clinic,through='DoctorClinics')

    def __str__(self):
        return str(f'{self.user.first_name} {self.user.last_name}')

######################## DoctorClinics Models ############################
class DoctorClinics(models.Model):
     clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
     clinic_owner = models.BooleanField(default=False)

######################## DoctorRating Models ############################
class DoctorRating(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    details = models.CharField(max_length=600)
    
    class Meta:
        db_table = 'doctor_rating'
        unique_together = (('doctor', 'user'),)

######################## week_days var ############################
week_days=(('Saturday','Saturday'),('Sunday','Sunday'),('Monday','Monday'),('Tuesday','Tuesday'),('Wednesday','Wednesday'),('Thursday','Thursday'),('Friday','Friday'))
######################## Schedule Models ############################
class Schedule(models.Model):
    from_time=models.TimeField(null=False)
    to_time=models.TimeField(null=False)
    day=models.CharField(max_length=25,choices=week_days)
    appointment_duration=models.FloatField()
    doctor=models.ForeignKey(Doctor, on_delete=models.CASCADE)
    clinic=models.ForeignKey(Clinic, on_delete=models.CASCADE)
    active=models.BooleanField(default=True)
    
######################## Appiontments Models ############################
class Appiontments(models.Model):
    visiting_time=models.TimeField(null=False)
    active=models.BooleanField(default=True)
    schedule=models.ForeignKey(Schedule, on_delete=models.CASCADE)
    user=models.ForeignKey(User, on_delete=models.CASCADE)

######################## Appiontments Models ############################
  