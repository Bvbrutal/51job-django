import pandas as pd
from django.shortcuts import render, get_object_or_404

# 使用Django ORM查询
from app.models import Joblists, UserIP
from app.script.visit_info import change_info


def main(request):
    return render(request, "old/index.html")


def index(request):
    return render(request, "old/index.html")


def pythoninfo(request):
    df = Joblists.objects.all()[:100]
    return render(request, 'old/pythoninfo.html', {'data': df})


def analysis(request):
    # data1
    queryset = Joblists.objects.all()
    data = list(queryset.values())
    df =  pd.DataFrame(data)
    df1 = df['Area'].value_counts()[:20]
    df1_index=df1.index.tolist()
    df1=zip(df1,df1_index)
    # data2
    df2 = df[['EducationRequirement', 'RecruitingTargets']].value_counts()[:20]
    df2_index = df2.index.tolist()
    df2=zip(df2,df2_index)
    # data3
    df3 = df['EnterpriseCategory'].value_counts()[:20]
    df3_index = df3.index.tolist()
    df3 =zip(df3,df3_index)
    # data4
    df4 = df['Salary'].value_counts()
    xdata = []
    ydata = []
    for i in sorted(df4.items(), key=lambda x: int(x[0])):
        xdata.append(i[0])
        ydata.append(i[1])
    # data5
    df5 = df[['Salary']].value_counts().apply(lambda x: x / df.shape[0])
    df6 = df['EnterpriseCategory'].value_counts().apply(lambda x: x / df.shape[0])
    df7 = df[['EducationRequirement', 'RecruitingTargets']].value_counts().apply(lambda x: x / df.shape[0])
    context = { 'df1': df1,'df2': df2, 'df3': df3, 'xdata': xdata, 'ydata': ydata,
               'df4': df4, 'df5': df5,
               'df6': df6, 'df7': df7}
    return render(request, 'old/analysis.html', context)


def wordcloud(request):
    return render(request, 'old/wordcloud.html')


def show(request):
    queryset = Joblists.objects.all()
    data = list(queryset.values())
    df = pd.DataFrame(data)
    job_conut=len(df)
    df['UpdateTime']=pd.to_datetime(df['UpdateTime'])
    df['UpdateTime']=df['UpdateTime'].dt.strftime('%m-%d')
    df3 = df[['CompanyName', 'UpdateTime']].drop_duplicates(keep='first').groupby('UpdateTime').count()['CompanyName']
    df4 = df[['JobTitle', 'UpdateTime']].groupby('UpdateTime').count()['JobTitle']

    data = df['Area'].value_counts()[:100]
    data_index = data.index.tolist()
    data = zip(data, data_index)

    ec1 = df['JobTitle'].value_counts()[:7]
    ec1_index = ec1.index
    ec1 = [list(ec1), list(ec1_index)]


    ec2=df['Area'].value_counts()[:7]
    ec2_index=ec2.index
    ec2=[list(ec2),list(ec2_index)]

    ec5 = df['EnterpriseCategory'].value_counts(sort=False)[:7]
    ec5_index = ec5.index
    ec5 = [list(ec5), list(ec5_index)]

    ec6=df['OccupationCategory'].value_counts()[:8]
    ec6_index = ec6.index
    ec6 = [list(ec6), list(ec6_index)]

    ec31 = df['EducationRequirement'].value_counts()[:7]
    ec31_index = ec31.index
    ec31_dic = zip(ec31, ec31_index)
    ec31 = [ec31_dic, list(ec31_index)]

    ec32 = df['RecruitingTargets'].value_counts()[:7]
    ec32_index = ec32.index
    ec32_dic = zip(ec32, ec32_index)
    ec32 = [ec32_dic, list(ec32_index)]

    ec33 = df['JobTitle'].value_counts()[:7]
    ec33_index = ec33.index
    ec33_dic = zip(ec33,ec33_index)
    ec33 = [ec33_dic, list(ec33_index)]

    ec4_1 = df3.index[-12::1]
    ec4_2 = df3.tail(12)
    ec4_3= df4.tail(12)
    ec4 = [list(ec4_1),list(ec4_2), list(ec4_3)]

    first_job=ec1_index[0]

    context={'data': data,'job_conut':job_conut,'ec1': ec1,'ec2':ec2,'ec5':ec5,'ec6':ec6,'ec31':ec31,'ec32':ec32,'ec33':ec33,'ec4':ec4,'first_job':first_job}
    return render(request, 'old/show.html', context)
