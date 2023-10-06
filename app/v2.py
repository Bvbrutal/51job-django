import pandas as pd
from django.shortcuts import render

# 使用Django ORM查询
from app.models import joblists


def index(request):
    return render(request,'index.html')


def visualization(request):
    # data1
    queryset = joblists.objects.all()
    data = list(queryset.values())
    df =  pd.DataFrame(data)
    df1 = df['Area'].value_counts()[:5]
    df1_index=df1.index.tolist()
    df1=zip(df1,df1_index)
    # data2
    df2 = df[['EducationRequirement', 'RecruitingTargets']].value_counts()[:5]
    df2_index = df2.index.tolist()
    df2=zip(df2,df2_index)
    # data3
    df3 = df['EnterpriseCategory'].value_counts()[:5]
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
    return render(request, 'visualization.html', context)