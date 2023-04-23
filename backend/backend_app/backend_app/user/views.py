from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializer import PersonSerializer, InfluxSerializer
from django.views.decorators.csrf import csrf_exempt
from random import randint
from .models import Person
# Create your views here.


@csrf_exempt
def create_person(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = PersonSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def get_all_persons(request):
    if request.method == "GET":
        persons = Person.objects.all()
        serializer = PersonSerializer(persons, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    
    return HttpResponse(status=400)

@csrf_exempt
def blacklist_person(request, id):
    if request.method == "POST":
        person = Person.objects.get(id=id)
        person.blacklisted = True
        serializer = PersonSerializer(data=person)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)