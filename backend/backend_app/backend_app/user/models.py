from django.db import models
from institutions.models import LandRegistry, SocialSecurity, Others
# Create your models here.

INFLUX_TYPES = (("salary", "SALARY"), ("others", "OTHERS"))


class Influx(models.Model):
    value = models.BigIntegerField(null=False)
    type = models.CharField(max_length=7, choices=INFLUX_TYPES)


class Person(models.Model):
    name = models.CharField(max_length=255, null=False)
    surname = models.CharField(max_length=255, null=False)
    id_number = models.CharField(max_length=13, unique=True, null=False)
    balance = models.BigIntegerField(default=0)

    influxes = models.ForeignKey(Influx, on_delete=models.CASCADE)
    land_registry = models.ForeignKey(LandRegistry, on_delete=models.CASCADE)
    social_security = models.ForeignKey(SocialSecurity, on_delete=models.CASCADE)
    other = models.ForeignKey(Others, on_delete=models.CASCADE)

