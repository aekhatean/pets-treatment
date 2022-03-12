from codecs import lookup_error
from copy import copy
from re import search
from unicodedata import name
# from msilib.schema import Class
from django.http import Http404
from django.shortcuts import redirect
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from users.paginations import StandardResultsSetPagination
from .serializers import *
from users.models import *
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta, date
from cryptography.fernet import Fernet
from .email_utils import send_mail_user, send_mail_user_appointment
from django.template.loader import render_to_string
from django.db.models import Q
from rest_framework import generics

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
        activation_link = f"http://127.0.0.1:8000/users/activate/{key.decode()}/{enc_token.decode()}"
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
                return redirect("http://localhost:3000/activate_message")
            else:
                return redirect("http://localhost:3000/expired_activation")
        except:
            return redirect("http://localhost:3000/expired_activation")




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
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'New Doctor has been added,\
we sent you a verification email, please check it and click the link','data':serializer.data},status=status.HTTP_201_CREATED)
        return Response({'msg':"Error can't create new doctor, please recheck your data",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



# availble specializations
class SpecializationsList(APIView):
    def get(self,request):
        specializations = Specialization.objects.all()
        data = SpecializationSerializer(specializations,many=True).data
        return Response(data,status=status.HTTP_200_OK)


class RateDoctor(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self,request, pk):
        rating = DoctorRating.objects.filter(doctor__id=pk)
        data = DoctorRatingSerializer(rating, many=True).data
        return Response(data,status=status.HTTP_200_OK)


    def post(self, request, pk):
            try:
                doctor = Doctor.objects.get(id=pk)
                user = request.user
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


# class FindDoctor(APIView):
#     def get(self, request):
#         search_term = request.query_params.get('find')

#         # Filters
#         areas = request.query_params.get('areas')  # List
#         city = request.query_params.get('city')  # List
#         countries = request.query_params.get('countries')  # List
#         specializations = request.query_params.get('specializations') # List

#         search_terms_list = search_term.split()
#         doctors = []

#         # Create filters
#         query_filters = Q()
#         if areas and len(areas) > 0:
#             query_filters.add(Q(clinics__area__in=areas), Q.AND)
#         if city and len(city) > 0:
#             query_filters.add(Q(clinics__city=city), Q.AND)
#         if countries and len(countries) > 0:
#             query_filters.add(Q(clinics__country__in=countries), Q.AND)
#         if specializations and len(specializations) > 0:
#             query_filters.add(Q(specialization__name__in=specializations), Q.AND)

#         # Search for the term
#         for term in search_terms_list:
#             query_terms = Q(user__first_name__icontains=term)
#             query_terms.add(Q(user__last_name__icontains=term), Q.OR)
#             query_terms.add(Q(description__icontains=term), Q.OR)
#             query_terms.add(Q(clinics__name__contains=search_term), Q.OR)

#             # Combine term and filters
#             query = query_filters
#             query.add(query_terms, Q.AND)

#             # Apply query
#             doctors += Doctor.objects.filter(query)

#         data = DoctorPublicSerializer(doctors,many=True).data
#         return Response({'data':data},status=status.HTTP_200_OK)

##### Doctor clinics ########
class DoctorClinicsView(APIView):
    permission_classes = [IsAuthenticated]
    # all clinic where doctor in
    def get(self,request):
        doctorClinics = DoctorClinics.objects.filter(doctor=Doctor.objects.get(user=request.user))
        data = DoctorClinicsSerializer(doctorClinics,many=True).data
        return Response(data,status=status.HTTP_200_OK)

class DoctorOwnClinicsView(APIView):
    permission_classes = [IsAuthenticated]
    # all clinic where doctor owned
    def get(self,request):
        doctorClinics = DoctorClinics.objects.filter(doctor=Doctor.objects.get(user=request.user),clinic_owner=True)
        data = DoctorClinicsSerializer(doctorClinics,many=True).data
        return Response(data,status=status.HTTP_200_OK)



class DoctorClinic_ClinicView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,pk):
        clinic = Clinic.objects.get(id=pk)
        doctorClinics = DoctorClinics.objects.filter(clinic=clinic)
        doctors=[]
        for doctor in doctorClinics:
            doctors.append(doctor.doctor)
        doctors_inclinic_serializer=DoctorSerializer(doctors,many=True).data
        return Response(doctors_inclinic_serializer,status=status.HTTP_200_OK)

    # delete doctor from clinic by clinic owner
    def post(self,request,pk):
        try:
            clinic = Clinic.objects.get(id=pk)
            clinic_owner = Doctor.objects.get(user=request.user)
            doctor = Doctor.objects.get(id=request.data["doctor_id"])
            if DoctorClinics.objects.filter(clinic=clinic, clinic_owner=True)[0].doctor == clinic_owner or doctor == Doctor.objects.filter(user=request.user)[0]:
                if DoctorClinics.objects.filter(clinic=clinic, doctor=doctor)[0]: 
                    doctor_clinics = DoctorClinics.objects.filter(doctor=doctor,clinic=clinic).delete()
                    return Response({
                                    'msg':'Doctor deleted from clinic Successfully',
                                },status=status.HTTP_200_OK)
                else:
                    return Response({
                            'errors':"Doctor is not in this clinic!"
                        },status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'msg':"You can't delete doctor from clinic if you aren't the doctor him/her self \
                or the clinic owner!"},
                    status.HTTP_401_UNAUTHORIZED) 
        except:                  
            return Response({
                    'error':'Data is not valid',
                },status=status.HTTP_404_NOT_FOUND)


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
        profile_serializer= ProfileSerializer(profile,data=request.data, partial=True)
        profile=profile_serializer.is_valid(raise_exception=True)
        profile=profile_serializer.save()
        return Response({
            'msg':'Profile has been updated',
            'data':profile_serializer.data
        },status=status.HTTP_200_OK)




# ################## Schedule ######################
class ScheduleList(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
# ################## Schedule for one doctor ######################
class ScheduleList_one_doctor(APIView):
    def get(self, request,pk):
        scheduals = Schedule.objects.filter(doctor=pk)
        data = ScheduleSerializer(scheduals,many=True).data
        return Response(data,status=status.HTTP_200_OK)
# ################## Schedule for one clinic and one doctor ######################
class ScheduleList_one_clinic_one_doctor(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk):
        scheduals = Schedule.objects.filter(clinic=pk,doctor=request.user.doctor.id)
        data = ScheduleSerializer(scheduals,many=True).data
        return Response(data,status=status.HTTP_200_OK)
# ################## Schedule for one doctor ######################
class ScheduleList_one_clinic(APIView):
    def get(self, request,pk):
        scheduals = Schedule.objects.filter(clinic=pk)
        data = ScheduleSerializer(scheduals,many=True).data
        return Response(data,status=status.HTTP_200_OK)
# ################## Schedule modification (delete,update,list one ) ######################
class ScheduleVview(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=ScheduleSerializer
    lookup_url_kwarg = 'pk'
    queryset = Schedule.objects.all()
    permission_classes = [IsAuthenticated]

class AppointmentList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        appointments = Appiontments.objects.all()
        print(appointments)
        appointments_serializer = AppointmentSerializer(appointments,many=True).data
        print(appointments_serializer)
        return Response(
            appointments_serializer, status.HTTP_200_OK
        )
    def post(self, request):
        appointment_serializer = AppointmentSerializer(data=request.data,  context={'request':request})
        appointment_serializer.is_valid(raise_exception=True)
        vals=appointment_serializer.save()
        send_mail_user_appointment(vals.user.first_name,vals.schedule.doctor.user.first_name + vals.schedule.doctor.user.last_name,vals.schedule.clinic.name,vals.visiting_time,vals.id,vals.user.email)
        return Response(appointment_serializer.data,status.HTTP_201_CREATED)


class AppointmentVview(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=AppointmentSerializer
    lookup_url_kwarg = 'pk'
    queryset = Appiontments.objects.all()

    permission_classes = [IsAuthenticatedOrReadOnly]


class UpcomingAppointmentsListByUser(generics.ListAPIView):
    def get_queryset(self):
        return Appiontments.objects.filter(user=self.request.user, date__gte=date.today())
    
    serializer_class = AppointmentSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

class PreviousAppointmentsListByUser(generics.ListAPIView):
    def get_queryset(self):
        return Appiontments.objects.filter(user=self.request.user, date__lt=date.today())
    
    serializer_class = AppointmentSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
class UpcomingAppointmentsListByDoctor(generics.ListAPIView):
    def get_queryset(self):
        clinic = self.request.query_params.get("clinic")
        return Appiontments.objects.filter(schedule__doctor__user=self.request.user, schedule__clinic=clinic, date__gte=date.today())
    
    serializer_class = AppointmentSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

class PreviousAppointmentsListByDoctor(generics.ListAPIView):
    def get_queryset(self):
        clinic = self.request.query_params.get("clinic")
        return Appiontments.objects.filter(schedule__doctor__user=self.request.user, schedule__clinic=clinic, date__lt=date.today())
    
    serializer_class = AppointmentSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
    
#/////////doctor filter/////////#
class Findmydoctor(generics.ListCreateAPIView):
    queryset = Doctor.objects.filter(is_varified=True)
    serializer_class = DoctorPublicSerializer
    filter_fields = ("user__first_name","user__last_name","clinics__name","specialization__name","clinics__city","clinics__area","clinics__country","profile__city","profile__country","profile__area")
