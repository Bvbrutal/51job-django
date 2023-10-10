from django.db import models
from datetime import datetime
from django.utils import timezone

'''
                  <td align="center">{{data['JobTitle'][i]}}</td>
                  <td align="center">{{data['Area'][i]}}</td>
                  <td align="center">{{data['CompanyName'][i]}}</td>
                  <td align="center">{{data['Salary'][i]}}</td>
                  <td align="center">{{data['EducationRequirement'][i]}}</td>
                  <td align="center">{{data['OccupationCategory'][i]}}</td>
                  <td align="center">{{data['RecruitingTargets'][i]}}</td>
                  <td align="center">{{data['EnterpriseCategory'][i]}}</td>
                  <td align="center">{{data['UpdateTime'][i]}}</td>
                  <td align="center">{{data['Keywords'][i]}}</td>
'''


class joblists(models.Model):
    ID = models.AutoField(primary_key=True)
    CompanyName = models.CharField(max_length=255, null=True, blank=True, verbose_name="公司名称")
    JobTitle = models.CharField(max_length=255, null=True, blank=True, verbose_name="岗位名称")
    Area = models.CharField(max_length=255, null=True, blank=True, verbose_name="地区")
    Salary = models.CharField(max_length=255, null=True, blank=True, verbose_name="薪资")
    EducationRequirement = models.CharField(max_length=255, null=True, blank=True, verbose_name="学历需求")
    OccupationCategory = models.CharField(max_length=255, null=True, blank=True, verbose_name="职业类别")
    RecruitingTargets = models.CharField(max_length=255, null=True, blank=True, verbose_name="招收对象")
    EnterpriseCategory = models.CharField(max_length=255, null=True, blank=True, verbose_name="招收对象")
    Keywords = models.CharField(max_length=255, null=True, blank=True, verbose_name="关键字")
    UpdateTime = models.DateField(null=True, blank=True, verbose_name="更新时间")

    class Meta:
        indexes = [
            models.Index(fields=['JobTitle'], name='idx_JobTitle'),
            models.Index(fields=['Area'], name='idx_Area'),
            models.Index(fields=['UpdateTime'], name='idx_UpdateTime'),
        ]


class aitools_Files(models.Model):
    title = models.CharField(max_length=255, verbose_name='文件名')
    file = models.FileField(upload_to='static/file/aitools/', verbose_name='文件地址')
    add_time = models.DateField(default=timezone.now, verbose_name='文件添加时间')


class user(models.Model):
    email = models.CharField(max_length=32, verbose_name='邮箱')
    password = models.CharField(max_length=64, verbose_name='密码')
    admin = models.SmallIntegerField(default=0,verbose_name='管理员')


# 访问网站的 ip 地址、端点和次数
class UserIP(models.Model):
    ip = models.CharField(verbose_name='IP 地址', max_length=30)
    ip_addr = models.CharField(verbose_name='IP 地理位置', max_length=30)
    end_point = models.CharField(verbose_name='访问端点', default='/', max_length=30)
    count = models.IntegerField(verbose_name='访问次数', default=0)

    class Meta:
        verbose_name = '访问用户信息'
        verbose_name_plural = verbose_name


# 网站总访问次数
class VisitNumber(models.Model):
    count = models.IntegerField(verbose_name='网站访问总次数', default=0)  # 网站访问总次数

    class Meta:
        verbose_name = '网站访问总次数'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.count)


# 单日访问量统计
class DayNumber(models.Model):
    day = models.DateField(verbose_name='日期', default=timezone.now)
    count = models.IntegerField(verbose_name='网站访问次数', default=0)  # 网站访问总次数

    class Meta:
        verbose_name = '网站日访问量统计'
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.day)



class HotSearchKeyword(models.Model):
    keyword = models.CharField(max_length=100)
    count = models.IntegerField(default=0)

class Game(models.Model):
    score = models.IntegerField(default=0)