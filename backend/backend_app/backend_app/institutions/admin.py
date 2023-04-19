from django.contrib import admin
from .models import LandRegistry, SocialSecurity, Others
# Register your models here.

admin.site.register(LandRegistry)
admin.site.register(SocialSecurity)
admin.site.register(Others)