import email
from django.db import models

# Create your models here.
class ContactSupport(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField(max_length=254)
    message=models.CharField(max_length=1000)

    def __str__(self):
        return self.name