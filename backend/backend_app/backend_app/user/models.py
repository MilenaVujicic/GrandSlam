from django.db import models
# Create your models here.

INFLUX_TYPES = (("salary", "SALARY"), ("others", "OTHERS"))
EFFLUX_SIZE = (("small", "SMALL"), ("medium", "MEDIUM"), ("large", "LARGE"))

class Person(models.Model):
    name = models.CharField(max_length=255, null=False)
    surname = models.CharField(max_length=255, null=False)
    id_number = models.CharField(max_length=13, unique=True, null=False)
    balance = models.BigIntegerField(default=0)


class Influx(models.Model):
    value = models.BigIntegerField(null=False)
    type = models.CharField(max_length=7, choices=INFLUX_TYPES)
    time = models.DateTimeField(auto_now=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)


class Efflux(models.Model):
    value = models.BigIntegerField(null=False)
    type = models.CharField(max_length=255, null=False)
    size = models.CharField(max_length=7, choices=EFFLUX_SIZE)
    time = models.DateTimeField(auto_now=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, null=True, blank=True)