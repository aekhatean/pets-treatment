from django.contrib import admin
from .models import Doctor,Specialization,Profile,DoctorClinics
# Register your models here.
admin.site.register(Doctor)
admin.site.register(Specialization)
admin.site.register(DoctorClinics)
admin.site.register(Profile)
