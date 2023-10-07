from django.shortcuts import render

def login(request):
    return render(request, 'login.html')


def user(request):
    return render(request,'user.html')