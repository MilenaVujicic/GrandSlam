from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializer import SocialSecuritySerializer, LandRegistrySerializer, OthersSerializer
from user.models import Person, Influx, Efflux
from user.serializer import InfluxSerializer, EffluxSerializer, PersonSerializer
from .models import SocialSecurity, Others, LandRegistry
from django.views.decorators.csrf import csrf_exempt
from pyteal import *
from random import randint
from algosdk import transaction, v2client, mnemonic
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
        b_person = Bytes(str(person.id))
        b_type = Bytes("others")
        b_value = Bytes(str(value))

        teal_program = Seq(
            Assert(Gtxn[0].application_args.length() == Int(3)),
            Assert(Gtxn[0].application_args[0] == b_person),
            Assert(Gtxn[0].application_args[1] == b_type),
            Assert(Gtxn[0].application_args[2] == b_value),

            Return(Int(0))
        )
        
        compileTeal(teal_program, mode=Mode.Application)
        ct = compileTeal(teal_program, mode=Mode.Application)
        
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

        b_person = Bytes(str(person.id))
        b_type = Bytes(buy_type)
        b_value = Bytes(str(value))
        b_size = Bytes(str(size))
        teal_program = Seq(
            Assert(Gtxn[0].application_args.length() == Int(3)),
            Assert(Gtxn[0].application_args[0] == b_person),
            Assert(Gtxn[0].application_args[1] == b_type),
            Assert(Gtxn[0].application_args[2] == b_value),
            Assert(Gtxn[0].application_args[3] == b_size),


            Return(Int(0))
        )

        ct = compileTeal(teal_program, mode=Mode.Application)
     
        serializer = EffluxSerializer(data=efflux)
        serializer['ct'] = ct
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


@csrf_exempt
def all_influxes(request):
   if request.method == "GET":
        influxes = Influx.objects.all()
        serializer = InfluxSerializer(influxes, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)


@csrf_exempt
def all_effluxes(request):
   if request.method == "GET":
        effluxes = Efflux.objects.all()
        serializer = EffluxSerializer(effluxes, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
