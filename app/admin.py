from django.contrib import admin

from .models import Joblists,Aitools_Files,User

# Register your models here.


class Joblistadmin(admin.ModelAdmin):
    list_display = ['CompanyName','JobTitle','Salary','Area']


class Aitools_Filesadmin(admin.ModelAdmin):
    list_display=['title','file','add_time']

class Useradmin(admin.ModelAdmin):
    list_display = ['email','password','admin','name']

admin.site.register(Joblists,Joblistadmin)
admin.site.register(Aitools_Files,Aitools_Filesadmin)
admin.site.register(User,Useradmin)