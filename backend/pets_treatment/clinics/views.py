from wsgiref.util import application_uri
from xmlrpc import client
from django.shortcuts import render
from rest_framework.response import Response
from clinics.models import *
from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

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
    clinic_serializer = ClinicSerializer(data=request.data)

    if clinic_serializer.is_valid():
        doctor = Doctor.objects.get(user = request.user)
        clinic = clinic_serializer.save(clinic_owner=doctor)

        for image in request.FILES.getlist('images'):
                clinic_image_serializer = ClinicImageSerializer(data={'clinic':clinic,'picture':image})
                if clinic_image_serializer.is_valid():
                    clinic_image_serializer.save()
                else:
                    clinic.delete()
                    return Response({
                        "msg":"There is a problem with clinic images.",
                        "errors": clinic_image_serializer.errors
                    }, status=status.HTTP_400_BAD_REQUEST)
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
        #edit
        if clinic.clinic_owner == Doctor.objects.get(user=request.user):
            request_images = request.FILES.getlist('images')
            clinic_serializer = ClinicSerializer(instance=clinic, data=request.data)

            if clinic_serializer.is_valid():
                clinic_images = ClinicPicture.objects.filter(clinic=pk)
                #images in request
                images = request_images

                if images and len(images) > 0:
                    #there are new images, so delete old images and add new ones
                        for image in images:
                            new_image_serializer = ClinicImageSerializer(data={'clinic':clinic,'picture':image})
                            if not new_image_serializer.is_valid():
                                return Response({
                                    'msg':'There is a problem in your images',
                                    'error':new_image_serializer.errors
                                },status=status.HTTP_400_BAD_REQUEST)

                        [image.delete() for image in clinic_images]

                        for image in images:
                            new_image_serializer = ClinicImageSerializer(data={'clinic':clinic,'picture':image})
                            if new_image_serializer.is_valid():
                                new_image_serializer.save()
                                
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
    
    except:
            return Response({
                'error':'Clinic not found',
            },status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clinicDelete(request, pk):
    try:
        clinic = Clinic.objects.get(id=pk)
        if clinic.clinic_owner == request.user:  
            clinic.delete()
            return Response({'msg':'Clinic Deleted Successfully'},status.HTTP_200_OK)
        else:
            return Response({'msg':"You can't delete a clinic that you didn't create"},
            status.HTTP_401_UNAUTHORIZED)  
        

    except Clinic.DoesNotExist:
                return Response({'msg':"Can't find clinic with given id"},status.HTTP_404_NOT_FOUND)

