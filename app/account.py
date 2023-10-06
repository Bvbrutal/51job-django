from django.shortcuts import render

def login(request):
    return render(request, 'old/templates/login.html')