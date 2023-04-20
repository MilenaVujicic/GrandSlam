from rest_framework import serializers
from .models import LandRegistry, SocialSecurity, Others
from django.db import models
from user.models import Person

class LandRegistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = LandRegistry
        fields = ('id', 'land_name', 'land_value', 'time', 'person')


class SocialSecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialSecurity
        fields = ('id', 'contract', 's_value', 'time', 'person')



class OthersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Others
        fields = ('id', 'others_name', 'others_value', 'time', 'person')
