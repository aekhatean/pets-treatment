from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ContactSerializer
# Create your views here.
class ContactSupportView(APIView):
    """ Create new contact message"""
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Message has been sent to support.','data':serializer.data},status=status.HTTP_200_OK)
        return Response({'msg':"Error can't create message, please recheck your data",'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
