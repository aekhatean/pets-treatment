from django.urls import path, include

from .views import *





urlpatterns = [
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
    path('doctors/',DoctorsList.as_view(),name='doctorslist' ),
    path('doctors/<int:pk>',DoctorsPublicProfile.as_view(),name='doctorpublicprofile'),
    path('doctors/doctorprofile',DoctorPofile.as_view(),name='doctorprofile'),
    path('register/', Register.as_view()),
    path('<str:key>/<str:enc_token>', ActivateUser.as_view()),
   
   
  
]
