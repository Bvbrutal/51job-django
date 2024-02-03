# 十六进制数 C7.4 转换为十进制数
# 公式：十六进制转十进制 = (C * 16^1) + (7 * 16^0) + (4 * 16^-1)

# C(十六进制) = 12(十进制)
# 7(十六进制) = 7(十进制)
# 4(十六进制) = 4(十进制)

decimal_value = (12 * 16**1) + (7 * 16**0) + (4 * 16**-1)
print(decimal_value)
