from django.urls import path
from .import views

urlpatterns = [
    path('list_clinics', views.clinicList, name="list_clinics"),
    path('detail_clinic/<int:pk>/', views.clinicDetail, name="detail_clinic"),
    path('create_clinic', views.clinicCreate, name="create_clinic"),
    path('update_clinic/<int:pk>/', views.clinicUpdate, name="update_clinic"),
    path('delete_clinic/<int:pk>/', views.clinicDelete, name="delete_clinic"),

]
