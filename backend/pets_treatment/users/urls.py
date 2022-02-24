from django.urls import path
from .views import *
urlpatterns = [
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
]
