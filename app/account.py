from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import User
import hashlib

def login(request):
    if request.method == 'GET':
        info_dic = request.session.get('info')
        if info_dic:
            return redirect('/index/')
        return render(request, 'user/user_login.html')

    email = request.POST.get('email')
    passwd = request.POST.get('passwd')
    # code = request.POST.get('code')
    encrypted_passwd = hashlib.md5(passwd.encode()).hexdigest()
    user_object = User.objects.filter(email=email, password=encrypted_passwd).first()
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
    if request.method == 'GET':
        info_dic = request.session.get('info')
        if info_dic:
            return redirect('/index/')
        return render(request, 'user/user_register.html')
    if request.method == 'POST':
        email=request.POST.get('email')
        name=request.POST.get('name')
        passwd=request.POST.get('passwd')
        repasswd=request.POST.get('repasswd')
        print(email,name,passwd,repasswd)
        user_object = User.objects.filter(email=email).first()
        print(user_object)
        if user_object:
            context = {
                'ret': 3,
                'msg': "账号已经注册"
            }
            return JsonResponse(context, safe=False)
        if passwd == repasswd:
            # 对密码进行MD5加密
            encrypted_passwd = hashlib.md5(passwd.encode()).hexdigest()
            # 将加密后的密码存储到数据库中
            User.objects.create(email=email, name=name, password=encrypted_passwd)
            context = {
                'ret': 1,
                'msg': "注册"
            }
            return JsonResponse(context, safe=False)
        else:
            context = {
                'ret': 2,
                'msg': "两次密码不匹配！"
            }
            return JsonResponse(context, safe=False)
    return render(request, 'user/user_register.html')
