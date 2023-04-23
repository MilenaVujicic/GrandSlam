from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializer import SocialSecuritySerializer, LandRegistrySerializer, OthersSerializer
from user.models import Person, Influx
from user.serializer import InfluxSerializer, EffluxSerializer, PersonSerializer
from .models import SocialSecurity, Others, LandRegistry
from django.views.decorators.csrf import csrf_exempt
from random import randint
# Create your views here.


@csrf_exempt
def generate_social_security_data(request, id):
    person = Person.objects.get(id_number=int(id))
    if request.method == "POST":    

        data = JSONParser().parse(request)
        value = int(data['salary'])
        contract = {
            "contract": data['contract'],
            "s_value": value,
            "person": person.id
        }

        influx = {
            "value": value,
            "type": "salary",
            "person": person.id
        }
        serializer = SocialSecuritySerializer(data=contract)
        person.balance += value

        if serializer.is_valid():
            serializer.save()
            person.save()
            influx_serializer = InfluxSerializer(data=influx)
            if influx_serializer.is_valid():
                influx_serializer.save()
            else:
                return JsonResponse(influx_serializer.errors, status=400)
            return JsonResponse(serializer.data, status=200)
        else:
            print(serializer.errors)
            return JsonResponse(serializer.errors, status=400)

    return HttpResponse(status=200)

@csrf_exempt
def get_a_loan(request, id, value):
    person = Person.objects.get(id_number=id)
    if request.method == "POST":
        other = {
            "others_name": "Loan",
            "others_value": value,
            "person": person.id
        }

        influx = {
            "value": value,
            "type": "others",
            "person": person.id
        }
        serializer = OthersSerializer(data=other)
        person.balance += value

        if serializer.is_valid():
            serializer.save()
            person.save()
            influx_serializer = InfluxSerializer(data=influx)
            if influx_serializer.is_valid():
                influx_serializer.save()
            else:
                return JsonResponse(influx_serializer.errors, status=400)

            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def generate_others(request, others_type, building_id):
    person = Person.objects.get(id=1)
    if others_type == "loan":
        value = randint(100000, 5000000)
    elif others_type == "building":
        building = LandRegistry.object.get(id=building_id)
        value = building.land_value

    if request.method == "POST":
        other = {
            "others_name": others_type,
            "others_value": value,
            "person": "1"
        }

        influx = {
            "value": value,
            "type": "others",
            "person": "1"
        }
        serializer = OthersSerializer(data=other)
        person.balance += value

        if serializer.is_valid():
            serializer.save()
            person.save()
            influx_serializer = InfluxSerializer(data=influx)
            if influx_serializer.is_valid():
                influx_serializer.save()
            else:
                return JsonResponse(influx_serializer.errors, status=400)

            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def building(request, type):
    person = Person.objects.get(id=1)
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = LandRegistrySerializer(data=data)
        influx = None
        influx_serializer = None
        efflux = None
        efflux_serializer = None
        if type == "sell":
            person.balance += int(data["land_value"])
            influx = {
                "value": int(data["land_value"]),
                "type": "others",
                "person": "1"

            }
            influx_serializer = InfluxSerializer(data=influx)
        elif type == "buy":
            person.balance -= int(data["land_value"])
            size = "small"
            if int(data["land_value"]) > 30000:
                size = "medium"

            if int(data["land_value"]) > 300000:
                size = "large"
            efflux = {
                "value": data["land_value"],
                "type": "selling a land",
                "size": size,
                "person": 1
            }
            efflux_serializer = EffluxSerializer(data=efflux)
        else:
            return JsonResponse(content=None, status=400)

        if serializer.is_valid():
            serializer.save()
            person.save()
            if efflux_serializer is not None and efflux_serializer.is_valid():
                efflux_serializer.save()

            if influx_serializer is not None and influx_serializer.is_valid():
                influx_serializer.save()
            return JsonResponse(serializer.data, status=200)

    return JsonResponse(content=None, status=400)

@csrf_exempt
def sell(request, id, value):
    person = Person.objects.get(id_number=id)
    if request.method == "POST":
        person.balance += int(value)
        influx = {
            "value": value,
            "type": "others",
            "person": person.id

        }
        serializer = InfluxSerializer(data=influx)
        if serializer.is_valid():
            serializer.save()
            person.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def buy(request, id, value, buy_type):
    person = Person.objects.get(id_number=id)
    if request.method == "POST":
        person.balance-=int(value)
        size = "small"
        if int(value) > 30000:
            size = "medium"

        if int(value) > 300000:
            size = "large"
        efflux = {
            "value":value,
            "type":buy_type,
            "size":size,
            "person":person.id
        }

        serializer = EffluxSerializer(data=efflux)
        if serializer.is_valid():
            serializer.save()
            person.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def create_efflux(request):
    person = Person.objects.get(id=1)
    if request.method == "POST":
        data = JSONParser.parse(request)
        serializer = EffluxSerializer(data=data)
        person.balance -= int(data["value"])

        if serializer.is_valid():
            person.save()
            serializer.save()
            return JsonResponse(serializer.data, status=200)

        return JsonResponse(content=serializer.errors, status=400)
    return HttpResponse(status=404)

