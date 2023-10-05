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


class simdFiles(models.Model):
    title=models.CharField(max_length=255,verbose_name='文件名')
    file=models.FileField(upload_to='static/file/',verbose_name='文件地址')
    add_time=models.DateField(default=timezone.now,verbose_name='文件添加时间')
