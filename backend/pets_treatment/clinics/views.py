from functools import partial
from msilib.schema import Class
from pydoc import doc
from wsgiref.util import application_uri
from django.shortcuts import render
from rest_framework.response import Response
from clinics.models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from users.models import *
from rest_framework.views import APIView
from users.email_utils import send_mail_doctor_invitation
@api_view(['GET'])
def clinicList(request):
    clinics = Clinic.objects.all()
    serializer = ClinicSerializer(clinics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def clinicDetail(request, pk):
    clinics = Clinic.objects.get(id=pk)
    serializer = ClinicSerializer(clinics, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clinicCreate(request):
    clinic_serializer = ClinicSerializer(data=request.data, context={'request':request})

    if clinic_serializer.is_valid():
        doctor = Doctor.objects.get(user=request.user)
        clinic = clinic_serializer.save()
        DoctorClinics.objects.create(doctor=doctor,clinic=clinic,clinic_owner=True)
        return Response({
                "msg":"Clinic created successfully",
                "data":clinic_serializer.data
            }, status=status.HTTP_201_CREATED)

    else:
            return Response({
                        "msg":"There is a problem with clinic data.",
                        "errors": clinic_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def clinicUpdate(request, pk):
    try:
        clinic = Clinic.objects.get(id=pk)
        doctor = Doctor.objects.get(user=request.user)
        #edit
        # doctorclinic.objects.get(clinic=clinic, doctor=doctor).clinic_owner == True
        if DoctorClinics.objects.get(clinic=clinic, doctor=doctor).clinic_owner == True:
            request_images = request.data.get('images')
            clinic_serializer = ClinicSerializer(instance=clinic, data=request.data, partial=True)

            if clinic_serializer.is_valid():
                clinic_images = ClinicPicture.objects.filter(clinic=pk)
                #images in request
                images = request_images

                if images and len(images) > 0:
                    #there are new images, so delete old images and add new ones
                        for image in images:
                            new_image_serializer = ClinicImageSerializer(data={'picture':image})
                            if not new_image_serializer.is_valid():
                                return Response({
                                    'msg':'There is a problem in your images',
                                    'error':new_image_serializer.errors
                                },status=status.HTTP_400_BAD_REQUEST)

                        [image.delete() for image in clinic_images]

                        for image in images:
                            new_image_serializer = ClinicImageSerializer(data={'picture':image})
                            if new_image_serializer.is_valid():
                                new_image_serializer.save(clinic=clinic)
                                
                clinic_serializer.save()
                return Response({
                    'msg':'Clinic Updated Successfully',
                    'data': clinic_serializer.data
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    'errors':clinic_serializer.errors
                },status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({
                'errors':"You can't update a project that you didn't create"
            },status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
            return Response({
                'error':'Clinic not found',
                'exc':f'{e}'
            },status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clinicDelete(request, pk):
    try:
        clinic = Clinic.objects.get(id=pk)
        doctor = Doctor.objects.get(user=request.user)
        if DoctorClinics.objects.get(clinic=clinic, doctor=doctor).clinic_owner == True:  
            clinic.delete()
            return Response({'msg':'Clinic Deleted Successfully'},status.HTTP_200_OK)
        else:
            return Response({'msg':"You can't delete a clinic that you didn't create"},
            status.HTTP_401_UNAUTHORIZED)  
        

    except Clinic.DoesNotExist:
                return Response({'msg':"Can't find clinic with given id"},status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addDoctorClinic(request, pk):
    try:
        clinic = Clinic.objects.get(id=pk)
        clinic_owner = Doctor.objects.get(user=request.user)
        doctor = Doctor.objects.get(national_id=request.data["doctor_nid"])
        if DoctorClinics.objects.get(clinic=clinic, clinic_owner=True).doctor==clinic_owner:
            if DoctorClinics.objects.filter(clinic=clinic, doctor=doctor):
                return Response({
                        'errors':"Doctor already exists!"
                    },status=status.HTTP_400_BAD_REQUEST)
            else:
                doctor_clinics = DoctorClinics.objects.create(doctor=doctor,clinic=clinic)
                doctor_clinics.save()
                return Response({
                                'msg':'Doctor added to clinic Successfully',
                            },status=status.HTTP_200_OK)
        else:
            return Response({'msg':"You can't add doctor to clinic you are not it's owner!"},
                status.HTTP_401_UNAUTHORIZED) 
    except:                  
        return Response({
                'error':'Data is not valid',
            },status=status.HTTP_404_NOT_FOUND)




########## Clinic Pictures ########
class Clinic_PicturesList(APIView):
    def get(self,request,pk):
        pictures = ClinicPicture.objects.filter(clinic=Clinic.objects.get(id=pk))
        data = ClinicImageSerializer(pictures,many=True).data
        return Response(data,status=status.HTTP_200_OK)


class AddExternalDoctorClinic(APIView):
    def post(self, request):
        # request.data should have clinic_id , doctor_id
        try:
            clinic = Clinic.objects.get(id=request.data.get('clinic_id'))
            doctor = Doctor.objects.get(id=request.data.get('doctor_id'))
            DoctorClinics.objects.create(doctor=doctor, clinic=clinic, clinic_owner=False)
            return Response({
                'msg':'Doctor added to the clinic successfully'
            }, status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error':'wrong id/s was provided.',
                'exception':f'{e}'
            }, status.HTTP_400_BAD_REQUEST)

class InviteDoctor(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        sender=request.user
        email = request.data.get("doctor_email")
        if not email:
            return Response({
                "error":"Email is required"
            },status.HTTP_400_BAD_REQUEST)
        try:
            User.objects.get(email=email)
            return Response({
                "error":"An account with this email already exists!"
            },status.HTTP_400_BAD_REQUEST)
        except:
            clinic_id = request.data.get("clinic_id")
            clinic_name = request.data.get("clinic_name")
            send_mail_doctor_invitation(sender_name=f'{sender.first_name} {sender.last_name}',
            clinic_name=clinic_name,link=f'http://localhost:3000/register/invitation/{clinic_id}',to_email=email)
            return Response({
                "msg":"Invitation sent successfully"
            },status.HTTP_200_OK)        
