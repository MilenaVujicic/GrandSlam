from rest_framework import serializers
from .models import Person, Influx, Efflux
from django.db import models


class InfluxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Influx
        fields = ('id', 'value', 'type', 'time', 'person')


class EffluxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Efflux
        fields = ('id', 'value', 'type', 'size', 'time', 'person')


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name', 'surname')
