import geoip2.database


def ip_to_addr(ip):
    """
    IP 转换成现实中的地理位置
    country = 国家
    province = 省
    city = 城市
    """
    reader = geoip2.database.Reader('blog/GeoLite2-City.mmdb')
    response = reader.city(ip)
    # print(response)
    # 因为有些IP的省份和城市未知，所以设置默认为空
    province = ''
    city = ''
    try:
        # 国家、省份、城市
        country = response.country.names["zh-CN"]
        province = response.subdivisions.most_specific.names["zh-CN"]
        city = response.city.names["zh-CN"]
    except:
        pass
    if country != '中国':
        return country
    if province and city:
        if province == city or city in province:
            return province
        return '%s%s' % (province, city)
    elif province and not city:
        return province
    else:
        return country