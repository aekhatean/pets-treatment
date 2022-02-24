from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from .serializers import *
from users.models import *
from django.contrib.auth.models import User
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pets_treatment import settings
from django.utils import timezone
from datetime import timedelta
# import os
# from cryptography.fernet import Fernet
# from django.template.loader import render_to_string

class Login(ObtainAuthToken):

    def post(self, request):
        serializer = self.serializer_class(data=request.data,
                                       context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.is_active == False:
            return Response({
                'error':'Sorry, your account is not activated'
            }, status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username':user.username,
            'email': user.email
        }, status=status.HTTP_200_OK)
class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({'msg':'Successfully logged out'},status.HTTP_200_OK)

# class Register(APIView):

#     parser_classes = [MultiPartParser, FormParser]

#     def send_mail_user(self,fname,link,to_email):
#         msg=MIMEMultipart('alternative')
#         msg['From']='Petsania'
#         msg['To']=to_email
#         msg['Subject']='Petsania Account Activation'
        
#         html_email = render_to_string("activation_user_email.html", {"first_name": fname,'activation_link': link})
#         html_part = MIMEText(html_email, 'html')
#         msg.attach(html_part)
#         msg_str=msg.as_string()

#         server=smtplib.SMTP(host=settings.EMAIL_HOST,port=settings.EMAIL_PORT)
#         server.ehlo()
#         server.starttls()
#         server.login(settings.EMAIL_HOST_USER,settings.EMAIL_HOST_PASSWORD)
#         server.sendmail(msg['From'],to_email,msg_str)
#         server.quit()

#     user = None
    
#     def post(self, request):
        
#         user_serializer = UserSerializer(data=request.data)
                
#         if user_serializer.is_valid():
#             try:
#                 self.user = user_serializer.save(is_active=False)
#                 token, created = Token.objects.get_or_create(user=self.user)
#                 key = Fernet.generate_key()
#                 fernet = Fernet(key)
#                 encMessage = fernet.encrypt(message.encode())
#                 activation_link = f"http://127.0.0.1:8000/users/{token.key}"
#                 self.send_mail_user(activation_link,self.user.email)
#                 return Response({
#                     'data':'we sent you a verification email, please check it and click the link',
#                 },status=status.HTTP_200_OK)
#             except Exception as e:
#                 if isinstance(self.user,User):
#                     self.user.delete()
#                 return Response({
#                     'errors':f'Error : {e}',
#                 },status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({
#                 'errors':'username and email and password are required',
#             },status=status.HTTP_400_BAD_REQUEST)
