from django.contrib import admin

from .models import Joblists

# Register your models here.


class Joblistadmin(admin.ModelAdmin):
    list_display = ['CompanyName','JobTitle','Salary','Area']


admin.site.register(Joblists,Joblistadmin)