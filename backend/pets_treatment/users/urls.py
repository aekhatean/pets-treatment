from django.urls import path, include
from rest_framework import routers
from .views import *


# create routers for api
router = routers.DefaultRouter()


urlpatterns = [
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
    path('doctors/',DoctorsList.as_view(),name='doctorslist' ),
    path('doctors/<int:pk>',DoctorsPublicProfile.as_view(),name='doctorpublicprofile'),
    path('doctors/doctorprofile/<int:pk>',DoctorPofile.as_view(),name='doctorprofile')
]
