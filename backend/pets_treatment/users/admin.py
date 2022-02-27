from django.contrib import admin
from .models import Appiontments, Doctor, Schedule,Specialization,Profile,DoctorClinics
# Register your models here.
admin.site.register(Doctor)
admin.site.register(Specialization)
admin.site.register(DoctorClinics)
admin.site.register(Profile)
admin.site.register(Schedule)
admin.site.register(Appiontments)

