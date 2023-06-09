"""
URL configuration for backend_app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from institutions.views import generate_social_security_data,buy, sell, generate_others, get_a_loan, building, create_efflux, all_effluxes, all_influxes
from user.views import create_person, get_all_persons
urlpatterns = [
    path("admin/", admin.site.urls),
    path("generate_social_security/<int:id>/", generate_social_security_data),
    path("person/", create_person),
    path("persons/",get_all_persons),
    path("building/<str:type>/", building),
    path("loan/<int:id>/<int:value>/", get_a_loan),
    path("buy/<int:id>/<int:value>/<str:buy_type>/", buy),
    path("sell/<int:id>/<int:value>/", sell),
    path("other/<str:others_type>/<int:building_id>/", generate_others),
    path("influx/", all_influxes),
    path("efflux/", all_effluxes),
]
