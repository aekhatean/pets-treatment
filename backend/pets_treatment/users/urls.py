from django.urls import path
from .views import *
urlpatterns = [
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
    path('register/', Register.as_view()),
    path('<str:key>/<str:enc_token>', ActivateUser.as_view()),
]
