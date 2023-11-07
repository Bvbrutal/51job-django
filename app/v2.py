import pandas as pd
from django.core.files.storage import FileSystemStorage
from django.db.models import Sum, Count
from django.shortcuts import render,redirect

from .script.Aphorisms import sentence,verse,dujitang

pdf_summary_storage = FileSystemStorage(location='/your/custom/path/')
# 使用Django ORM查询
from app.models import Joblists, UserIP, User, Job_search
from app.script.visit_info import change_info


# 404页面
def custom_404_view(request, exception=None):
    return render(request, 'index/404.html', status=404)


def index(request):
    change_info(request, '/index')
    city = UserIP.objects.all().last()
    email=request.session['info']['email']
    name=User.objects.filter(email=email).first().name
    sentence1 = sentence()
    sentence2 = dujitang
    sentence3 = verse
    sentences=[sentence1,sentence2,sentence3]
    context = {'city': city, 'name': name, 'sentences': sentences}
    print(context['city'].ip, context['city'].ip_addr)

    return render(request, 'index/index.html', context)


# 51JOB
def job51_index(request):
    job_top = Joblists.objects.values('JobTitle').annotate(total=Count('ID')).order_by('-total')[:10]
    Occupation_top = Joblists.objects.values('OccupationCategory').annotate(total=Count('ID')).order_by('-total')[:10]
    context = {
        'job_top': job_top,
        'Occupation_top': Occupation_top
    }
    print(Occupation_top)
    return render(request, 'job51/job51_index.html', context)


def job51_data_show(request):
    job51_data = Joblists.objects.all()[:20]
    context = {'job51_data': job51_data}
    return render(request, 'job51/job51_data_show.html', context)


def job51_search(request):
    query = request.GET.get('keyword')
    results = []
    keywords = Job_search.objects.all().order_by('-keyword_count')[:20]
    re=Job_search.objects.filter(keyword_job=query).first()
    if query:
        if re:
            count=re.keyword_count
            re.keyword_count+=1
            re.save()
        else:
            job_search_obj = Job_search(keyword_job=query, keyword_count=0)
            job_search_obj.save()
        results = Joblists.objects.filter(JobTitle__icontains=query)[:20]
    for i in keywords:
        print(i.keyword_job)
    context = {'results': results, 'query': query,'keywords':keywords}
    return render(request, 'job51/job51_search.html', context)


def job51_visual_screen(request):
    queryset = Joblists.objects.all()
    data = list(queryset.values())
    df = pd.DataFrame(data)
    job_conut = len(df)
    df['UpdateTime'] = pd.to_datetime(df['UpdateTime'])
    df['UpdateTime'] = df['UpdateTime'].dt.strftime('%m-%d')
    df3 = df[['CompanyName', 'UpdateTime']].drop_duplicates(keep='first').groupby('UpdateTime').count()['CompanyName']
    df4 = df[['JobTitle', 'UpdateTime']].groupby('UpdateTime').count()['JobTitle']

    data = df['Area'].value_counts()[:100]
    data_index = data.index.tolist()
    data = zip(data, data_index)

    ec1 = df['JobTitle'].value_counts()[:7]
    ec1_index = ec1.index
    ec1 = [list(ec1), list(ec1_index)]

    ec2 = df['Area'].value_counts()[:7]
    ec2_index = ec2.index
    ec2 = [list(ec2), list(ec2_index)]

    ec5 = df['EnterpriseCategory'].value_counts(sort=False)[:7]
    ec5_index = ec5.index
    ec5 = [list(ec5), list(ec5_index)]

    ec6 = df['OccupationCategory'].value_counts()[:8]
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
    ec33_dic = zip(ec33, ec33_index)
    ec33 = [ec33_dic, list(ec33_index)]

    ec4_1 = df3.index[-12::1]
    ec4_2 = df3.tail(12)
    ec4_3 = df4.tail(12)
    ec4 = [list(ec4_1), list(ec4_2), list(ec4_3)]

    first_job = ec1_index[0]

    context = {'data': data, 'job_conut': job_conut, 'ec1': ec1, 'ec2': ec2, 'ec5': ec5, 'ec6': ec6, 'ec31': ec31,
               'ec32': ec32, 'ec33': ec33, 'ec4': ec4, 'first_job': first_job}
    return render(request, 'job51/visual_screen.html', context)


def job51_screen(request):
    queryset = Joblists.objects.all()
    data = list(queryset.values())
    df = pd.DataFrame(data)
    job_conut = len(df)
    df['UpdateTime'] = pd.to_datetime(df['UpdateTime'])
    df['UpdateTime'] = df['UpdateTime'].dt.strftime('%m-%d')
    df3 = df[['CompanyName', 'UpdateTime']].drop_duplicates(keep='first').groupby('UpdateTime').count()['CompanyName']
    df4 = df[['JobTitle', 'UpdateTime']].groupby('UpdateTime').count()['JobTitle']

    data = df['Area'].value_counts()[:100]
    data_index = data.index.tolist()
    data = zip(data, data_index)

    ec1 = df['JobTitle'].value_counts()[:7]
    ec1_index = ec1.index
    ec1 = [list(ec1), list(ec1_index)]

    ec2 = df['Area'].value_counts()[:7]
    ec2_index = ec2.index
    ec2 = [list(ec2), list(ec2_index)]

    ec5 = df['EnterpriseCategory'].value_counts(sort=False)[:7]
    ec5_index = ec5.index
    ec5 = [list(ec5), list(ec5_index)]

    ec6 = df['OccupationCategory'].value_counts()[:8]
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
    ec33_dic = zip(ec33, ec33_index)
    ec33 = [ec33_dic, list(ec33_index)]

    ec4_1 = df3.index[-12::1]
    ec4_2 = df3.tail(12)
    ec4_3 = df4.tail(12)
    ec4 = [list(ec4_1), list(ec4_2), list(ec4_3)]

    first_job = ec1_index[0]

    context = {'data': data, 'job_conut': job_conut, 'ec1': ec1, 'ec2': ec2, 'ec5': ec5, 'ec6': ec6, 'ec31': ec31,
               'ec32': ec32, 'ec33': ec33, 'ec4': ec4, 'first_job': first_job}
    return render(request, 'job51/screen.html', context)


def job51_visualization(request):
    # data1
    queryset = Joblists.objects.all()
    data = list(queryset.values())
    df = pd.DataFrame(data)
    df1 = df['Area'].value_counts()[:5]
    df1_index = df1.index.tolist()
    df1 = zip(df1, df1_index)
    # data2
    df2 = df[['EducationRequirement', 'RecruitingTargets']].value_counts()[:5]
    df2_index = df2.index.tolist()
    df2 = zip(df2, df2_index)
    # data3
    df3 = df['EnterpriseCategory'].value_counts()[:5]
    df3_index = df3.index.tolist()
    df3 = zip(df3, df3_index)
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
    context = {'df1': df1, 'df2': df2, 'df3': df3, 'xdata': xdata, 'ydata': ydata,
               'df4': df4, 'df5': df5,
               'df6': df6, 'df7': df7}
    return render(request, 'job51/visualization.html', context)


# AI-TOOlS
# from app import whisper
#
# model = whisper.load_model("base")
#

def aitools(request):

    return render(request, 'aitools/aitools_index.html')


# def aitools_whisper(request):
#     if request.method == 'GET':
#         return render(request, 'aitools_whisper.html')
#     file_name = request.POST.get('file_name')
#     text = model.transcribe(file_name)
#     context = {'statu': 200,
#                "message": text['text']}
#     return JsonResponse(context)


def aitools_pdf_gpt(request):
    return render(request, 'aitools/aitools_pdf_gpt.html')


from django.http import HttpResponseRedirect, JsonResponse, HttpResponse

from app.forms import Aitools_FilesForms
def pdf_upload_file(request):
    if request.method == 'POST':
        form = Aitools_FilesForms(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('success')  # 重定向到上传成功的页面
    return render(request, 'upload.html', {'form': form})


from .models import Snake,Els




def games_index(request):
    return render(request, "games/games_index.html")
def snake(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        score = request.POST.get('score')
        print(name,score)
        return HttpResponse()
    return render(request, "games/snake.html")


def els(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        # Els.objects.
        return HttpResponse()

    return render(request, "games/els.html")

