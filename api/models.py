from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=60)
    email = models.EmailField(unique=True, null=False)
    password = models.CharField(max_length=30)
    username = models.CharField(max_length=100, unique=True, null=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'email']