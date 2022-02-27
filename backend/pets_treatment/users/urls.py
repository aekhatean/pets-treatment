from django.urls import path, include

from .views import *





urlpatterns = [
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
    path('doctors/',DoctorsList.as_view(),name='doctorslist' ),
    path('doctors/<int:pk>',DoctorsPublicProfile.as_view(),name='doctorpublicprofile'),
    path('doctors/doctorprofile',DoctorProfile.as_view(),name='doctorprofile'),
    path('doctors/new',AddDoctor.as_view()),
    path('doctors/specialities/',SpecializationsList.as_view()),
    path('schedule/<int:pk>', ScheduleVview.as_view()),
    path('appointment/<int:pk>', AppointmentVview.as_view()),
    path('register/', Register.as_view()),
    path('<str:key>/<str:enc_token>', ActivateUser.as_view()),
    path('doctors/rating/<int:pk>', RateDoctor.as_view()),
    path('doctors/search/<str:search_term>', FindDoctor.as_view()),
    path('schedule/', ScheduleList.as_view()),
    path('appointment/', AppointmentList.as_view()),
    path('profilelist',ViewProfile.as_view()),
]
