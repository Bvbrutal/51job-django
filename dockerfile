# 基于 Python 3.8 镜像构建
FROM python:3.9

# 设置工作目录
WORKDIR /app

# 复制当前目录下的所有文件到容器中的 /app 目录
COPY . /app

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 设置环境变量
ENV PYTHONUNBUFFERED 1

# 运行 Django 服务
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
