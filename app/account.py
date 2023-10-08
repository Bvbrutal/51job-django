from django.http import JsonResponse
from django.shortcuts import render


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')


    email = request.POST.get('email')
    password = request.POST.get('password')
    code = request.POST.get('code')

    print(email,password,code)
    context={'ret':1}
    return JsonResponse(context, safe=False)

def user(request):
    return render(request,'user.html')