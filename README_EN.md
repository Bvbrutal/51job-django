<h1 align="center">
  <p>
    51job Recruitment Website Scraping and Visualization
  <p>
</h1>
<div>
<h4 align="center">
    <p>
        <a href="/README_EN.md">English</a>|
        <b>中文</b> 
    <p>
</h4>
</div>

# Demonstration⌛

Example address:http://51job.pshxx.cc

----

1. Web Display
![Process Diagram](app/static/img/img_1.png)
![img.png](app/static/img/img_5.png)
![img_1.png](app/static/img/img_3.png)


2. Data Crawling
![Process Diagram](app/static/img/img.png)
![Process Diagram](app/static/img/img_4.png)


# Introduction📝

------
- 🌐 Customizable scraping of job keywords and quantities
- 📈 Real-time display of recruitment situation on a large screen
- 🎨 Generating data analysis graphics using ECharts
- 🐳 Using MySQL for storage to achieve frontend data interaction

# Start the Scraping Service⚡

------
1. First, download the required packages (I didn't filter the generated packages directly, so there might be some clutter🚨)
```
pip install -r requirements.txt
```

2. Modify the configuration file `config.ini` and add MySQL, account information, etc.

3. Run the crawler

```
python crawler.py
```

# Web Visualization✨

Run the command in the terminal under the project folder

------
## local

```
python app.py
```

or

```
flask run
```

## docker
```
docker build -t my-python-app . && docker run -d -p 5000:5000 my-python-app
```