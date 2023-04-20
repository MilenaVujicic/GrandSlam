from django.db import models
from user.models import Person
# Create your models here.


class LandRegistry(models.Model):
    land_name = models.CharField(max_length=255)
    land_value = models.BigIntegerField()
    time = models.DateTimeField(auto_now=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)


class SocialSecurity(models.Model):
    contract = models.CharField(max_length=255)
    s_value = models.IntegerField()
    time = models.DateTimeField(auto_now=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)


class Others(models.Model):
    others_name = models.CharField(max_length=255)
    others_value = models.BigIntegerField()
    time = models.DateTimeField(auto_now=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)
