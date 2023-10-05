from django.contrib import admin

from .models import joblists

# Register your models here.


class joblistadmin(admin.ModelAdmin):
    list_display = ['CompanyName','JobTitle','Salary','Area']


admin.site.register(joblists,joblistadmin)