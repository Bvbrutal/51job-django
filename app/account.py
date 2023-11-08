from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import User


def login(request):
    if request.method == 'GET':
        info_dic = request.session.get('info')
        if info_dic:
            return redirect('/index/')
        return render(request, 'user/user_login.html')

    email = request.POST.get('email')
    passwd = request.POST.get('passwd')
    # code = request.POST.get('code')
    user_object = User.objects.filter(email=email, password=passwd).first()
    if user_object:
        request.session['info'] = {'id': user_object.id, 'email': user_object.email}
        context = {
            'ret': 1,
            'msg': "登陆成功"
        }
        return JsonResponse(context, safe=False)
    elif User.objects.filter(email=email).first() or User.objects.filter(password=passwd).first():
        context = {
            'ret': 2,
            'msg': "账号或密码错误!"
        }
        return JsonResponse(context, safe=False)
    else:
        context = {
            'ret': 3,
            'msg': "邮箱不存在"
        }
        return JsonResponse(context, safe=False)


def logout(request):
    request.session.clear()
    return redirect('/user/login/')


def user_proflie(request):
    return render(request, 'user/user_profile.html')


def user_register(request):
    if request.method == 'POST':
        email=request.POST.get('email')
        name=request.POST.get('name')
        passwd=request.POST.get('passwd')
        print(email,name,passwd)
    return render(request, 'user/user_register.html')
