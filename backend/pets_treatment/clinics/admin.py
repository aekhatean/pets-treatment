from django.contrib import admin
from .models import *

class ClinicAdmin(admin.ModelAdmin):
    list_display = ('id','name','is_verified')
class ClinicPictureAdmin(admin.ModelAdmin):
    list_display = ('id','clinic_name')

    def clinic_name(self, obj):
        return obj.clinic.name

admin.site.register(Clinic, ClinicAdmin)
admin.site.register(ClinicPicture, ClinicPictureAdmin)
