import pandas as pd
from django.shortcuts import render

def read_csv(path):
    del_cols = ['车辆行驶里程','驾驶员需求扭矩值']
    # '车速'单独考虑
    num_cols = [ '低压蓄电池电压','整车当前总电流','整车当前总电压']

    '''数据处理'''
    # 读取文件
    df0 = pd.read_csv(path,index_col=False,low_memory=False)
    if "train/92.csv" in path:
        df0.drop(51210,inplace=True)
    if "test/219.csv" in path:
        df0.drop(22484,inplace=True)
    # 删除缺失值
    df = df0.dropna(axis=0,thresh=17)
    df = df.rename(columns={'采集时间':'CollectTime'})
    df['CollectTime'] = pd.to_datetime(df['CollectTime'],format='%Y-%m-%d %H:%M:%S')
    # 去重
    df.drop_duplicates(subset=['车号','CollectTime'],keep='first',inplace=True)
    # 排序
    df = df.sort_values('CollectTime').reset_index(drop=True)
    # 删除无效特征
    df = df.drop(del_cols,axis=1)
    # 档位状态
    df['整车当前档位状态'] = df['整车当前档位状态'].replace('驻车','空档')
    # 电池包主负继电器状态
    df['电池包主负继电器状态'] = df['电池包主负继电器状态'].replace('粘连','断开')
    # 主驾驶座占用状态
    df = df[df['主驾驶座占用状态'] != '传感器故障']

    '''特征构造'''
    df['time_delta'] = df['CollectTime'].diff().dt.total_seconds()
    df['time_delta_5'] = (df['CollectTime']-df['CollectTime'].shift(5)).dt.total_seconds()

    # 特征构造1: 判断数据是启动or停车——162 80(2020-12-02 13:04:13)
    a = pd.DataFrame()
    b = pd.DataFrame()
    df['电池包主负继电器状态cate'] = df['电池包主负继电器状态'].astype('category').cat.codes
    for i in np.arange(5):
        a['电池状态'+str(i)] = df['电池包主负继电器状态cate']-df['电池包主负继电器状态cate'].shift(i+1)
        b['电池状态'+str(i)] = df['电池包主负继电器状态cate']-df['电池包主负继电器状态cate'].shift(-i-1)
    df['if_off'] = a.sum(axis=1)
    df['if_on'] = b.sum(axis=1)

    # 特征构造2: 车速特征
    df['v_diff1'] = df['车速'].diff()/df['time_delta']#用于规则分类
    df['v_diff2'] = -df['车速'].shift(3).rolling(window=3).mean()/df['time_delta_5']#用于规则分类(前5条数据的3条取平均)
    df['v_diff3'] = df['车速'].diff() # 用于规则&LGBM
    df['v_diff4'] = df['v_diff1'].shift(-1) # 用于时间预测
    df['a_min5'] = df['v_diff1'].rolling(window=3).min() # 用于LGBM模型
    df['a_mean5'] = df['v_diff1'].rolling(window=3).mean() # 用于LGBM模型
    df['a_max3'] = df['v_diff1'].rolling(window=3).min() # 用于LGBM模型

    df = df.iloc[5:,:]

    # 删除时间戳太长的数据
    df = df[df['time_delta_5']<90]

    return df
def get_vehicle_data(num):
    # 替换为你的CSV文件路径
    csv_file_path = './app/static/data/IOFV/test/' + str(num) + '.csv'
    # 读取CSV文件
    df = read_csv(csv_file_path)
    date = df['CollectTime'].tolist()
    data = df['车速'].tolist()
    turn = df['方向盘转角'].tolist()
    print(turn[:3])

    return {"date": date, "data": data, 'turn': turn}


def IOFV_index(request):
    context = get_vehicle_data(121)
    return render(request, "IOFV/Visualization.html", context)
