from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin


class authmiddleware(MiddlewareMixin):
    def process_request(self,request):

        if request.path_info =='/user/login/' or request.path_info=='/user/register/':
            return

        info_dic=request.session.get('info')
        if info_dic:
            return
        return redirect('/user/login/')
