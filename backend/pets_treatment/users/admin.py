from django.contrib import admin
from .models import Doctor,Specialization,DoctorSpecialization,Profile
# Register your models here.
admin.site.register(Doctor)
admin.site.register(Specialization)
admin.site.register(DoctorSpecialization)
admin.site.register(Profile)