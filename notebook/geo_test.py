#!/usr/bin/python
# -*-coding:utf-8-*-
import geoip2.database

reader = geoip2.database.Reader('GeoLite2-City.mmdb')
ip = input("输入你要查询的IP:\n")
response = reader.city(ip)
# 有多种语言，我们这里主要输出英文和中文
print("你查询的IP的地理位置是:")

print("地区：{}({})".format(response.continent.names["es"],
                           response.continent.names["zh-CN"]))

print("国家：{}({}) ，简称:{}".format(response.country.name,
                                    response.country.names["zh-CN"],
                                    response.country.iso_code))

print("洲／省：{}({})".format(response.subdivisions.most_specific.name,
                            response.subdivisions.most_specific.names["zh-CN"]))

print("城市：{}({})".format(response.city.name,
                           response.city.names["zh-CN"]))

print("经度：{}，纬度{}".format(response.location.longitude,
                              response.location.latitude))

print("时区：{}".format(response.location.time_zone))

print("邮编:{}".format(response.postal.code))