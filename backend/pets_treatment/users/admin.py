from django.contrib import admin
from .models import Appiontments, Doctor, Schedule,Specialization,Profile,DoctorClinics,DoctorRating
# Register your models here.

class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('id','day','doctor_name','clinic_name','from_time','to_time','active',)

    def clinic_name(self, obj):
        return obj.clinic.name

    def doctor_name(self, obj):
        return f'{obj.doctor.user.first_name} {obj.doctor.user.last_name}'

class DoctorClinicsAdmin(admin.ModelAdmin):
    list_display = ('clinic_name','doctor_name','clinic_owner')

    def clinic_name(self, obj):
        return obj.clinic.name
    def doctor_name(self, obj):
        return f'{obj.doctor.user.first_name} {obj.doctor.user.last_name}'



admin.site.register(Doctor)
admin.site.register(Specialization)
admin.site.register(DoctorClinics, DoctorClinicsAdmin)
admin.site.register(Profile)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Appiontments)
admin.site.register(DoctorRating)

