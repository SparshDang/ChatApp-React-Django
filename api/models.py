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


class Friend(models.Model):
    person1 = models.ForeignKey(
        User, on_delete=models.CASCADE, related_query_name="person1", related_name="person1")
    person2 = models.ForeignKey(
        User, on_delete=models.CASCADE, related_query_name="person2", related_name="person2")

    def __str__(self) -> str:
        return f"{self.person1}-{self.person2}"


class Message(models.Model):
    socket = models.CharField(max_length=200)
    username = models.CharField(max_length=60)
    message = models.TextField()
    time_stamp = models.DateTimeField(auto_created=True, auto_now=True)