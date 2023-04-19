from django.db import models

# Create your models here.


class LandRegistry(models.Model):
    land_name = models.CharField(max_length=255)
    land_value = models.BigIntegerField()


class SocialSecurity(models.Model):
    contract = models.CharField(max_length=255)
    s_value = models.IntegerField()


class Others(models.Model):
    others_name = models.CharField(max_length=255)
    others_value = models.BigIntegerField()
