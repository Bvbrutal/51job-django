import jieba
from wordcloud import WordCloud
import pandas as pd
import pymysql
# from crawler.get_information import get_information, get_setting

# mysql_password,mysql_root,host_ip=get_information()
def wordcloud():
    # sql 命令
    sql_cmd = "SELECT * FROM jobdata"
    # 用DBAPI构建数据库链接engine
    con = pymysql.connect(host='81.71.101.143', user='51job', password='AXhNXLPKyFsarYJi', database='51job', charset='utf8', use_unicode=True)
    df = pd.read_sql(sql_cmd, con)

    data=df['岗位名称']
    lists=[]
    for i in range(data.shape[0]):
        lists.append(data[i])
    words = jieba.lcut(str(lists))     #精确分词
    newtxt = ' '.join(words)    #空格拼接
    wordcloud = WordCloud(font_path='../static/assets/fonts/simhei.ttf',
                # 设置字体，不指定就会出现乱码
                # 设置背景色
                background_color='white',
                # 设置背景宽
                width=1920,
                # 设置背景高
                height=1040).generate(newtxt)
    wordcloud.to_file('keyword_post.jpg')
    print('词云生成完毕！！！！！')


if __name__ == '__main__':
    wordcloud()