from django.db import models
from django.contrib.auth.models import User

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

def nid_upload(instance, filename):
    extension = filename.split(".")[1]
    return "users/doctors/%s/nid.%s" % (instance.user.id, extension)

# Doctor (id, user(one2one), is_varified(manual bool),  syndicate_id(file), national_id, description) 
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=1000)
    syndicate_id = models.FileField(upload_to=synd_upload,null=True)
    national_id = models.FileField(upload_to=nid_upload,null=True)
    is_varified = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user.first_name)

# Specialization (id , name) 
class Specialization(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


# Rel_spec_doctor (id, spec , doctor)
class DoctorSpecialization(models.Model):
    specialization = models.ForeignKey(Specialization, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)


# Doctor Clinic Rel
# Doctor rating
class DoctorRating(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    details = models.CharField(max_length=600)
    
    class Meta:
        db_table = 'doctor_rating'
        unique_together = (('doctor', 'user'),)


