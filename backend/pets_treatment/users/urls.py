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
    path('doctors/clinics/',DoctorClinicsView.as_view()),
    path('doctors/own_clinics/',DoctorOwnClinicsView.as_view()),
    path('doctors/own_clinics/<int:pk>',DoctorClinic_ClinicView.as_view()),
    path('schedule/<int:pk>', ScheduleVview.as_view()),
    path('schedule/doctor/<int:pk>', ScheduleList_one_doctor.as_view()),
    path('schedule/clinic/<int:pk>', ScheduleList_one_clinic.as_view()),
    path('appointment/<int:pk>', AppointmentVview.as_view()),
    path('doctor-appointment/<int:pk>', AppointmentsListByDoctor.as_view()),
    path('register/', Register.as_view()),
    path('<str:key>/<str:enc_token>', ActivateUser.as_view()),
    path('doctors/rating/<int:pk>', RateDoctor.as_view()),
    path('doctors/search/', FindDoctor.as_view()),
    path('schedule/', ScheduleList.as_view()),
    path('appointment/', AppointmentList.as_view()),
    path('profilelist',ViewProfile.as_view()),
]
