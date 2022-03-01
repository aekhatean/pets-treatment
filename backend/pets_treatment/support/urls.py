from django.urls import path

from .views import *





urlpatterns = [
    path('', ContactSupportView.as_view()),
]