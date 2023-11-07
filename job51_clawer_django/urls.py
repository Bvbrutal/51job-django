"""
URL configuration for job51_clawer_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from app import v2, account
from app import views

urlpatterns = [
    path("admin/", admin.site.urls),

    # 旧版
    path('index_old/', views.index),
    path('show/', views.show),
    path('wordcloud/', views.wordcloud),
    path('analysis/', views.analysis),
    path('pythoninfo/', views.pythoninfo),
    path('main/', views.main),

    # 新版
    # v2主要
    path('', v2.index),
    path('index/', v2.index),

    # account账户
    path('user/profile', account.user_proflie),
    path('user/register/', account.user_register),
    path('user/login/', account.login),
    path('user/logout/', account.logout),

    # 51JOB
    path('job51/index/', v2.job51_index),
    path('job51/data_show/', v2.job51_data_show),
    path('job51/search/', v2.job51_search, name='job51_search'),
    path('job51/visualization/', v2.job51_visualization),
    path('job51/visual_screen/', v2.job51_visual_screen),
    path('job51/screen/', v2.job51_screen),

    # AI-TOOLS
    path('aitools/index/', v2.aitools),
    # path('aitools/whisper/',v2.aitools_whisper),
    path('aitools/pdf_gpt/', v2.aitools_pdf_gpt),

    # 404页面
    path('404/', TemplateView.as_view(template_name='index/404.html'), name='404'),

    # 休闲游戏
    path('others/games_index/', v2.games_index, name='games_index'),
    path('others/snake/', v2.snake, name='snake'),
    path('others/els/', v2.els, name='els'),

]

handler404 = 'app.v2.custom_404_view'
