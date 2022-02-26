from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .serializers import *
from users.models import *
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from cryptography.fernet import Fernet
from .email_utils import send_mail_user
from django.template.loader import render_to_string
from django.db.models import Q


class Login(ObtainAuthToken):

    def post(self, request):
        serializer = TokenSerializer(data=request.data,
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

class Register(APIView):
    def post(self, request):

        profile_serializer = ProfileSerializer(data=request.data)
        profile_serializer.is_valid(raise_exception=True)
        profile = profile_serializer.save()
        token, created = Token.objects.get_or_create(user=profile.user)
        key = Fernet.generate_key()
        fernet = Fernet(key)
        enc_token = fernet.encrypt(token.key.encode())
        activation_link = f"http://127.0.0.1:8000/users/{key.decode()}/{enc_token.decode()}"
        send_mail_user(profile.user.first_name,activation_link,profile.user.email)
        return Response({
            'data':'we sent you a verification email, please check it and click the link',
        },status=status.HTTP_200_OK)
class ActivateUser(APIView):
    def get(self, request, key, enc_token):
        try:
            safe_key = key.encode("utf-8")
            safe_token = enc_token.encode("utf-8")
            fernet = Fernet(safe_key)
            token_key = fernet.decrypt(safe_token).decode()
            token = Token.objects.get(key=token_key)
            user = token.user
            time_passed = timezone.now() - user.date_joined 
            if not time_passed >= timedelta(hours=24):
                user.is_active = True
                user.save()
                token.delete()
                return Response({
                    'msg':'User Activated Successfully, You can login now'
                },status=status.HTTP_200_OK)
            else:
                    return Response({
                    'error':'Sorry the link is expired'
                },status=status.HTTP_400_BAD_REQUEST)                       
        except:
            return Response({
                    'error':'Sorry the link is expired',
                },status=status.HTTP_400_BAD_REQUEST)



################## Doctor ######################

class DoctorsList(APIView):
    """ Doctors list for public view"""
    def get(self, request):
        doctors = Doctor.objects.filter(is_varified=True)
        data = DoctorPublicSerializer(doctors,many=True).data
        return Response(data,status=status.HTTP_200_OK)

class DoctorsPublicProfile(APIView):
    """ Doctor profile for public view"""
    def get_object(self, pk):
        try:
            return Doctor.objects.get(is_varified=True,id=pk)
        except Doctor.DoesNotExist:
            raise Http404
    def get(self, request,pk):
        doctor = self.get_object(pk)
        data = DoctorPublicSerializer(doctor).data
        return Response(data,status=status.HTTP_200_OK)

# doctor authed profile
class DoctorProfile(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self, request):
        try:
            return Doctor.objects.get(user=request.user)
        except Doctor.DoesNotExist:
            raise Http404

    def get(self, request):
        doctor = self.get_object(request)
        data = DoctorSerializer(doctor).data
        return Response(data,status=status.HTTP_200_OK)

    def put(self,request):
        doctor = self.get_object(request)
        serializer = DoctorSerializer(doctor,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Profile has been updated','data':serializer.data},status=status.HTTP_200_OK)
        return Response({'msg':"Error doctor profile cann't be edited, please recheck your data",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class AddDoctor(APIView):
    """ Create new Doctor"""
    def post(self, request):
        # print(request.data)
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'New Doctor has been added,\
we sent you a verification email, please check it and click the link','data':serializer.data},status=status.HTTP_200_OK)
        return Response({'msg':"Error can't create new doctor, please recheck your data",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



# availble specializations
class SpecializationsList(APIView):
    def get(self,request):
        specializations = Specialization.objects.all()
        data = SpecializationSerializer(specializations,many=True).data
        return Response(data,status=status.HTTP_200_OK)





# doctor specioalizations
# class DoctorSpecializations(APIView):
#     permission_classes = [IsAuthenticated]
#     def get_object(self, request):
#         try:
#             return Doctor.objects.get(user=request.user)
#         except Doctor.DoesNotExist:
#             raise Http404

#     def get(self,request):
#         doctor_speciality = DoctorSpecialization.objects.all()
#         data = DoctorSpecializationSerializer(doctor_speciality,many=True).data
#         return Response(data,status=status.HTTP_200_OK)
#     def post(self,request):
#         doctor =self.get_object(request)
#         try:
#             DoctorSpecialization.objects.create(doctor=doctor, specialization=Specialization.objects.get(name=request.data['specialization']))
#             return Response({'msg':'New Specialization for Doctor has been added'},status=status.HTTP_200_OK)
#         except:
#             return Response({'msg':"Error can't add new speciality for doctor, please recheck your data"}, status=status.HTTP_400_BAD_REQUEST)
    
# class UpdateDoctorSpecialization(APIView):
#     permission_classes = [IsAuthenticated]
#     def get_object(self, request):
#         try:
#             return Doctor.objects.get(user=request.user)
#         except Doctor.DoesNotExist:
#             raise Http404
#     def put(self,request,pk):
#         doctor =self.get_object(request)
#         try:
#             DoctorSpecialization.objects.filter(id=pk).update(specialization=Specialization.objects.get(name=request.data['specialization']))
#             return Response({'msg':'Specialization for Doctor has been updated'},status=status.HTTP_200_OK)
#         except:
#             return Response({'msg':"Error can't update speciality for doctor, please recheck your data"}, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self,request,pk):
#         doctor =self.get_object(request)
#         try:
#             DoctorSpecialization.objects.filter(id=pk).delete()
#             return Response({'msg':'Specialization for Doctor has been Deleted'},status=status.HTTP_200_OK)
#         except:
#             return Response({'msg':"Error can't delete speciality for doctor, please recheck your data"}, status=status.HTTP_400_BAD_REQUEST)


class RateDoctor(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
            try:
                doctor = Doctor.objects.get(id=pk)
                user = request.user
                print(request.data)
                print(doctor, user)
                serializer = DoctorRatingSerializer(data={
                    "details": request.data["details"],
                    "rating": request.data["rating"],
                    "user": user.id,
                    "doctor": doctor.id
                })
                if (DoctorRating.objects.filter(user=user, doctor=doctor)):
                    return Response({'msg':"You have reviewed this doctor before, you cannot do it again."},status.HTTP_404_NOT_FOUND)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'msg':"There is no such doctor, make sure id is correct"},status.HTTP_404_NOT_FOUND)


    def put(self, request, pk):
        try:
            doctor = Doctor.objects.get(id=pk)
            user = request.user
            doctor_rating = DoctorRating.objects.get(doctor__id=pk)
            serializer = DoctorRatingSerializer(doctor_rating, data={
                        "details": request.data["details"],
                        "rating": request.data["rating"],
                        "user": user.id,
                        "doctor": doctor.id
            })
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'msg': "make sure this doctor was rated by the same user before"}, status=status.HTTP_400_BAD_REQUEST)


class FindDoctor(APIView):
    def get(self, request, search_term):
        search_terms_list = search_term.split()
        doctors = []
        for term in search_terms_list:
            doctors += Doctor.objects.filter(
                Q(user__first_name__icontains=term)| Q(user__last_name__icontains=term)| Q(description__icontains=term)  #| Q(clinics__name__contains=search_term)
            )
        data = DoctorPublicSerializer(doctors,many=True).data
        return Response({'data':data},status=status.HTTP_200_OK)
################## Profile ######################
class ViewProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            return Response({
                'data':ProfileSerializer(user.profile).data
            },status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error':'Something wrong happened',
                'exc': f'{e}'
            },status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        user = request.user
        profile=user.profile
        profile_serializer= ProfileSerializer(profile,data=request.data)
        profile=profile_serializer.is_valid(raise_exception=True)
        profile=profile_serializer.save()
        return Response({
            'data':'Profile has been updated',
        },status=status.HTTP_200_OK)




