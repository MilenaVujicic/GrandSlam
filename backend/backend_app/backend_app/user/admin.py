from django.contrib import admin
from .models import Person, Influx, Efflux
# Register your models here.

admin.site.register(Person)
admin.site.register(Influx)
admin.site.register(Efflux)
