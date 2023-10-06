function autopasswd(type, min, max) {
    var res = ""
      , range = min
      , arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if (type) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        res += arr[pos];
    }
    return res;
}
;$("#pwd-update").click(function() {
    var fm = $(this).closest('#user_profile_password_update');
    fm.validate({
        rules: {
            oldpwd: {
                required: true
            },
            pwd: {
                required: true,
                minlength: 8
            },
            repwd: {
                required: true
            }
        },
        messages: {
            oldpwd: "请填写账号的旧密码",
            pwd: {
                required: "请填写要设置的新密码",
                minlength: "新密码至少需要8位"
            },
            repwd: "请再次输入新密码"
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
            element.addClass('is-invalid');
            error.addClass('invalid-feedback');
        }
    });
    if (!fm.valid()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "password",
        dataType: "json",
        data: {
            oldpwd: $("#oldpwd").val(),
            pwd: $("#pwd").val(),
            repwd: $("#repwd").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: '登录密码' + data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user'", 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: '错误',
                html: +'     出现了一些错误。',
                timer: 1500,
                allowOutsideClick: true,
                showConfirmButton: false
            });
        }
    });
});
$("#sublink-reset").click(function() {
    var $sspwd = autopasswd(true, 8, 10);
    Swal.fire({
        type: 'info',
        title: '请注意！',
        html: '重置节点订阅链接后，原订阅链接将失效，并生成新的订阅链接，您需要在所有客户端重新添加新的订阅后更新节点才能使用！',
        showCancelButton: true,
        confirmButtonText: '确定重置',
        cancelButtonText: '取消'
    }).then((result)=>{
        if (result.value) {
            $("#sublink-reset").text('重置中    ').attr('disabled', true);
            $.ajax({
                type: "POST",
                url: "sspwd",
                dataType: "json",
                data: {
                    sspwd: $sspwd
                },
                success: function(data) {
                    if (data.ret) {
                        Swal.fire({
                            type: 'success',
                            title: '重置节点订阅链接成功！',
                            showConfirmButton: false
                        });
                        window.setTimeout("location.href='/user/url_reset'", 1000);
                    } else {
                        Swal.fire({
                            type: 'error',
                            title: '重置失败',
                            html: '请刷新页面后重试一遍',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                },
                error: function(exp) {
                    Swal.fire({
                        type: 'error',
                        title: '错误',
                        html: exp.msg,
                        timer: 1500,
                        showConfirmButton: false
                    });
                    $("#sublink-reset").text('重置订阅').attr('disabled', false);
                }
            });
        }
        ;
    }
    );
});
$(function() {
    new ClipboardJS('.copy-text');
});
$(".copy-text").click(function() {
    Swal.fire({
        type: "success",
        title: "已复制到剪切板",
        timer: 1000,
        allowOutsideClick: true,
        showConfirmButton: false
    });
});
$("#ga-enable-true").click(function() {
    $.ajax({
        type: "POST",
        url: "gacheck",
        dataType: "json",
        data: {
            code: $("#ga-code").val()
        },
        success: (data)=>{
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false,
                });
                window.setTimeout("location.href='/user/profile'", 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        }
        ,
        error: (exp)=>{
            Swal.fire({
                type: 'error',
                title: '出现错误',
                html: data.msg,
                timer: 1500,
                allowOutsideClick: true,
                showConfirmButton: false
            });
        }
    });
});
$("#ga-enable-false").click(function() {
    if ($("#ga-passwd").val() == '') {
        Swal.fire({
            type: 'error',
            title: '请输入密码',
            timer: 1500,
            allowOutsideClick: true,
            showConfirmButton: false
        });
        return;
    }
    $("#ga-enable-false").text('正在关闭').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "gaset",
        dataType: "json",
        data: {
            enable: 0,
            passwd: $("#ga-passwd").val()
        },
        success: (data)=>{
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user/profile'", 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user/profile'", 1000);
            }
        }
        ,
        error: (exp)=>{
            Swal.fire({
                type: 'error',
                title: '出现错误',
                html: data.msg,
                timer: 1500,
                allowOutsideClick: true,
                showConfirmButton: false
            });
        }
    });
});
$('.ga_passwd-password').click(function() {
    $('#ga_passwd-none').toggle();
    $('#ga_passwd-show').toggle();
    if ($('#ga-passwd').attr('type') == 'password') {
        $('#ga-passwd').attr('type', 'text');
    } else {
        $('#ga-passwd').attr('type', 'password');
    }
    ;
});
$("#user_profile_dailymail").click(function() {
    $.ajax({
        type: "POST",
        url: "mail",
        dataType: "json",
        data: {
            mail: $("#dailymail").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user/profile'", 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: '错误',
                html: data.msg + '     出现了一些错误。',
                timer: 1500,
                allowOutsideClick: true,
                showConfirmButton: false
            });
        }
    });
});
$("#unblock").click(function() {
    $.ajax({
        type: "POST",
        url: "unblock",
        dataType: "json",
        data: {},
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: '提交成功',
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user/profile'", 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: '错误',
                html: data.msg + '     出现了一些错误。',
                timer: 1500,
                allowOutsideClick: true,
                showConfirmButton: false
            });
        }
    });
});
$('.delete_passwd-password').click(function() {
    $('#delete_passwd-none').toggle();
    $('#delete_passwd-show').toggle();
    if ($('#delete_passwd').attr('type') == 'password') {
        $('#delete_passwd').attr('type', 'text');
    } else {
        $('#delete_passwd').attr('type', 'password');
    }
    ;
});
$("#kill").click(function() {
    $("#kill").text('删除账号数据中').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "kill",
        dataType: "json",
        data: {
            passwd: $("#delete_passwd").val(),
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: '销毁成功',
                    html: data.msg,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/'", 2000);
            } else {
                $("#kill").text('确定删除').removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: "error",
                title: "发生错误",
                html: exp.status + data.msg,
                confirmButtonText: '确定'
            });
        }
    });
});
function codeTopup() {
    $.ajax({
        type: "POST",
        url: "code",
        dataType: "json",
        data: {
            code: $("#pay_code").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: "success",
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
                window.setTimeout("location.href=window.location.href", 1500);
            } else {
                Swal.fire({
                    type: "error",
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: "error",
                title: '发生错误：' + exp.status
            });
        }
    });
}
function pay() {
    $.ajax({
        type: "POST",
        url: "/user/payment/purchase",
        dataType: "json",
        data: {
            amount: $("#amount").val()
        },
        success: function(data) {
            if (data.ret) {
                pid = data.pid;
                $("#qrarea").html('<div><p>请使用手机支付宝扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><br /><br /><p>手机可点击二维码唤起支付宝支付</p></div><br />');
                new QRCode("qrcode",{
                    render: "canvas",
                    width: 200,
                    height: 200,
                    text: encodeURI(data.qrcode)
                });
                $('#qrcode').attr('href', data.qrcode);
                setTimeout(f, 1000);
            } else {
                Swal.fire(data.msg + "  发生了错误。");
            }
        },
        error: function(exp) {
            Swal.fire(exp + "  发生了错误。");
        }
    })
}
function f2f_payjs() {
    $.ajax({
        type: "POST",
        url: "/user/payment/purchase",
        dataType: "json",
        data: {
            amount: $("#amount").val(),
            payment: type
        },
        success: function(data) {
            if (data.ret) {
                pid = data.pid;
                $("#qrarea").html('<div><p>请使用手机扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><br /><br /><p>手机可点击二维码唤起支付</p></div><br />');
                new QRCode("qrcode",{
                    render: "canvas",
                    width: 200,
                    height: 200,
                    correctLevel: 3,
                    text: data.qrcode
                });
                $('#qrcode').attr('href', data.qrcode);
                setTimeout(f, 1000);
            } else {
                Swal.fire(data.msg + "  发生了错误。");
            }
        },
        error: function(exp) {
            Swal.fire(exp + "  发生了错误。");
        }
    })
}
function f() {
    $.ajax({
        type: "POST",
        url: "/payment/status",
        dataType: "json",
        data: {
            pid: pid
        },
        success: (data)=>{
            if (data.result) {
                Swal.fire({
                    title: "成功充值" + $("#amount").val() + "元",
                    icon: "success",
                    button: "确定",
                })
                window.setTimeout("location.href='/user/code'", 1000);
            }
        }
        ,
        error: (exp)=>{
            Swal.fire(data.msg + "  发生了错误。");
        }
    });
    tid = setTimeout(f, 1000);
}
function spay() {
    var price = parseFloat($("#amount").val());
    console.log("将要使用 SPay 方法充值" + price + "元");
    if (isNaN(price)) {
        swal.fire("非法金额！", "", "error");
        return;
    }
    $.ajax({
        'url': "/user/payment/purchase",
        'data': {
            'price': price,
        },
        'dataType': 'json',
        'type': "POST",
        success: (data)=>{
            if (data.code == 0) {
                swal.fire("正在跳转到支付宝...");
                console.log(data);
                window.location.href = data.url;
            } else {
                swal.fire(data.msg, "", "error");
                console.log(data);
            }
        }
    });
}
;$("#idt_pay").click(function() {
    var pid = 0;
    var price = parseFloat($("#amount").val());
    if (isNaN(price)) {
        Swal.fire({
            type: "error",
            title: '非法的金额',
            timer: 1500,
            showConfirmButton: false
        });
    }
    setTimeout(function() {
        $.ajax({
            url: "/user/payment/purchase",
            data: {
                price: price,
                type: type
            },
            dataType: 'json',
            type: "POST",
            success: function(data) {
                console.log(data);
                if (data.errcode == -1) {
                    Swal.fire({
                        type: "error",
                        title: data.errmsg,
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
                if (data.errcode == 0) {
                    pid = data.pid;
                    $("#dialog-msg").html("正在跳转..." + data.code);
                }
            },
            error: function(exp) {
                console.log(exp);
                Swal.fire({
                    type: "error",
                    title: '发生错误 ' + exp.status
                });
            }
        });
    }, 1000);
});
function wxpay() {
    var type = 'wechat';
    var price = parseFloat($("#amount").val());
    if (isNaN(price)) {
        Swal.fire("非法金额", "", 'error');
        return;
    }
    $.ajax({
        url: "/user/payment/purchase",
        data: {
            price,
            type,
        },
        dataType: 'json',
        type: "POST",
        success: (data)=>{
            if (data.code == 0) {
                $("#readytopay").modal('hide');
                {
                    pid = data.pid;
                    $("#qrarea").html('<div class="text-center"><p>使用微信扫描二维码支付.</p><div align="center" id="qrcode" style="padding-top:10px;"></div><br /><p>充值完毕后会自动跳转</p></div>');
                    var qrcode = new QRCode("qrcode",{
                        correctLevel: 3,
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: data.url
                    });
                    tid = setTimeout(f, 1000);
                }
            } else {
                Swal.fire(data.msg + "  发生了错误。");
            }
        }
    });
}
function f() {
    $.ajax({
        type: "POST",
        url: "/payment/status",
        dataType: "json",
        data: {
            pid
        },
        success: (data)=>{
            if (data.result) {
                Swal.fire({
                    title: "成功充值" + $("#amount").val() + "元",
                    icon: "success",
                    button: "确定",
                })
                window.setTimeout("location.href='/user/code'", 1000);
            }
        }
        ,
        error: (exp)=>{}
    });
    tid = setTimeout(f, 1000);
}
;function tmtpay() {
    var price = parseFloat($("#amount").val());
    console.log("将要使用" + type + "方法充值" + price + "元")
    $.ajax({
        'url': "/user/payment/purchase",
        'data': {
            'price': price,
            'type': type,
        },
        'dataType': 'json',
        'type': "POST",
        success: function(data) {
            console.log(data);
            if (data.errcode == -1) {
                swal.fire(data.errmsg, " ", "error");
            }
            if (data.errcode == 0) {
                pid = data.pid;
                if (type == "wxpay") {
                    swal.fire("正在跳转到微信...");
                    window.setTimeout("location.href= '" + data.code + "'", 1000)
                } else if (type == "alipay") {
                    swal.fire("正在跳转到支付宝...");
                    window.setTimeout("location.href= '" + data.code + "'", 1000)
                }
            }
        }
    });
}
;$("#reset-link").click(function() {
    Swal.fire({
        type: 'info',
        title: '请注意！',
        html: '重置邀请链接后，原邀请码和邀请链接将失效，并随机生成新的邀请码和邀请链接',
        showCancelButton: true,
        confirmButtonText: '确定重置',
        cancelButtonText: '取消'
    }).then((result)=>{
        if (result.value) {
            Swal.fire({
                type: 'success',
                title: '重置成功',
                showConfirmButton: false
            });
            window.setTimeout("location.href='/user/inviteurl_reset'", 1500);
        }
        ;
    }
    );
});
function buy_Invite() {
    $.ajax({
        type: "POST",
        url: "/user/buy_invite",
        dataType: "json",
        data: {
            num: $("#buy-invite-num").val(),
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user/invite'", 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: data.msg,
                html: '出现了一些错误',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
;function custom_invite_confirm() {
    $("#custom-invite-confirm").text('定制中').addClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "/user/custom_invite",
        dataType: "json",
        data: {
            customcode: $("#custom-invite-link").val(),
        },
        success: (data)=>{
            $("#custom-invite-confirm").text('确定').removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                Swal.fire({
                    type: 'error',
                    title: '出错啦',
                    html: data.msg
                });
            }
        }
        ,
        error: (exp)=>{
            $("#custom-invite-confirm").text('确定').removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
            Swal.fire({
                type: 'error',
                title: data.msg,
                html: '出现了一些错误',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
;$('#ss-random-password').click(function() {
    let newsspwd = Math.random().toString(36).substr(2);
    $("#ss-password").attr("value", newsspwd);
});
$('#ss-pwd-update').click(function() {
    $.ajax({
        type: "POST",
        url: "sspwd",
        dataType: "json",
        data: {
            sspwd: $("#ss-password").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: "修改成功",
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                Swal.fire({
                    type: 'error',
                    title: "修改失败",
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        }
    })
});
$('#method-confirm').click(function() {
    $.ajax({
        type: "POST",
        url: "method",
        dataType: "json",
        data: {
            method: $("#method-select").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: "修改成功",
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                Swal.fire({
                    type: 'error',
                    title: "修改失败",
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        }
    })
});
$('#reset-port').click(function() {
    $.ajax({
        type: "POST",
        url: "resetport",
        dataType: "json",
        data: {},
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: "重置成功",
                    html: "新端口是 " + data.msg,
                    timer: 2500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        }
    })
});
$('#port-specify-set').click(function() {
    $.ajax({
        type: "POST",
        url: "specifyport",
        dataType: "json",
        data: {
            port: $("#port-specify-reset").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        }
    })
});
$('#protocol-obfs-confirm').click(function() {
    $.ajax({
        type: "POST",
        url: "ssr",
        dataType: "json",
        data: {
            protocol: $("#protocol-selection").val(),
            obfs: $("#obfs").val(),
            obfs_param: $("#obfs-param").val()
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: "修改成功",
                    html: data.msg,
                    timer: 2500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1500);
            } else {
                Swal.fire({
                    type: 'error',
                    title: "修改失败",
                    html: data.msg,
                    timer: 1500,
                    allowOutsideClick: true,
                    showConfirmButton: false
                });
            }
        }
    })
});
$('#ticket-create-click').click(function() {
    $.ajax({
        type: "POST",
        url: "/user/ticket",
        dataType: "json",
        data: {
            content: $("#ticket-create-content-text").val(),
            title: $("#ticket-create-title-text").val(),
            status: status
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: exp.msg,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});
function ticket_off(tkid, status) {
    $.ajax({
        type: "PUT",
        url: '/user/ticket/' + tkid,
        dataType: "json",
        data: {
            content: '这条工单已被关闭',
            status: status
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: "出现错误",
                html: "请刷新页面后重试",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
;function ticket_relay(tkid) {
    var status = 1;
    $.ajax({
        type: "PUT",
        url: '/user/ticket/' + tkid,
        dataType: "json",
        data: {
            content: $("#ticket-reply-content-text").val(),
            status: status
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            } else {
                Swal.fire({
                    type: 'error',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: 'error',
                title: "出现错误",
                html: "请刷新页面后重试",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}
;$(function() {
    for (var url = window.location, element = $(".sidebarnav a").filter(function() {
        return this.href == url;
    }).addClass("active").parent().addClass("active"); ; ) {
        if (!element.is("li"))
            break;
        element = element.parent().addClass("in").parent().addClass("active");
    }
});
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function IsWindows() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return true
    } else if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
        return true
    } else {
        return false
    }
}
function IsMac() {
    var agent = navigator.userAgent.toLowerCase();
    var MAC = /macintosh|mac os x/i.test(navigator.userAgent) && !window.MSStream;
    if (MAC) {
        return true
    } else {
        return false
    }
}
function IsAndroid() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        return true
    } else {
        return false
    }
}
function IsiOS() {
    var u = navigator.userAgent;
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return true
    } else {
        return false
    }
}
function oneclickImport(client, url) {
    if (client == 'ssr') {
        var url_base64 = window.btoa(url);
        if (IsWindows()) {
            window.location.href = "sub://" + url_base64;
        } else {
            Swal.fire({
                title: '您的设备可能不支持',
                html: '<code>SSR</code>一键导入仅支持<code>Windows</code>端<code>SSR 5.1</code>以上版本',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '继续导入',
                cancelButtonText: '取消'
            }).then((result)=>{
                if (result.value) {
                    window.location.href = "sub://" + url_base64;
                }
            }
            )
        }
    }
    if (client == 'clashr') {
        if (IsWindows() || IsMac() || IsAndroid()) {
            window.location.href = "clash://install-config?url=" + window.encodeURIComponent("https://api.suda.cat/sub?target=clash&url=" + url);
        } else {
            Swal.fire({
                title: '您的设备可能不支持',
                html: '<code>ClashR</code>一键导入仅支持<code>Windows</code>、<code>Mac OS</code>和<code>Android</code>',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '继续导入',
                cancelButtonText: '取消'
            }).then((result)=>{
                if (result.value) {
                    window.location.href = "clash://install-config?url=" + url;
                }
            }
            )
        }
    }
    if (client == 'clashx') {
        if (IsWindows() || IsMac() || IsAndroid()) {
            window.location.href = "clash://install-config?url=" + window.encodeURIComponent("https://api.suda.cat/sub?target=clash&url=" + url);
        } else {
            Swal.fire({
                title: '您的设备可能不支持',
                html: '<code>ClashR</code>一键导入仅支持<code>Windows</code>、<code>Mac OS</code>和<code>Android</code>',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '继续导入',
                cancelButtonText: '取消'
            }).then((result)=>{
                if (result.value) {
                    window.location.href = "clash://install-config?url=" + url;
                }
            }
            )
        }
    }
    if (client == 'shadowrocket') {
        var url_base64 = window.btoa(url);
        if (IsiOS()) {
            window.location.href = "sub://" + url_base64;
        } else {
            Swal.fire({
                title: '您的设备可能不支持',
                html: '<code>Shadowrocket</code>一键导入仅支持<code>Apple iOS</code>端设备',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '继续导入',
                cancelButtonText: '取消'
            }).then((result)=>{
                if (result.value) {
                    window.location.href = "sub://" + url_base64;
                }
            }
            )
        }
    }
    if (client == 'quantumult') {
        var url_base64 = window.btoa(url);
        var url_base64_nes = url_base64.replace(/=/g, "");
        if (IsiOS()) {
            window.location.href = "quantumult://configuration?server=" + url_base64_nes;
        } else {
            Swal.fire({
                title: '您的设备可能不支持',
                html: '<code>Quantumult</code>一键导入仅支持<code>Apple iOS</code>端设备',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '继续导入',
                cancelButtonText: '取消'
            }).then((result)=>{
                if (result.value) {
                    window.open("quantumult://configuration?server=" + url_base64_nes)
                }
            }
            )
        }
    }
    if (client == 'quantumult_v2') {
        var url_base64 = window.btoa(url);
        var url_base64_nes = url_base64.replace(/=/g, "");
        if (IsiOS()) {
            window.location.href = "quantumult://configuration?server=" + url_base64_nes;
        } else {
            Swal.fire({
                title: '您的设备可能不支持',
                html: '<code>Quantumult</code>一键导入仅支持<code>Apple iOS</code>端设备',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '继续导入',
                cancelButtonText: '取消'
            }).then((result)=>{
                if (result.value) {
                    window.location.href = "quantumult://configuration?server=" + url_base64_nes;
                }
            }
            )
        }
    }
}
;$("#checkin").click(function() {
    $("#checkin").text('正在签到').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "/user/checkin",
        dataType: "json",
        success: function(data) {
            setTimeout(function() {
                $.notify({
                    title: '<strong>签到成功</strong>',
                    message: data.msg
                }, {
                    type: 'success',
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    timer: 1000,
                    animate: {
                        enter: 'animated zoomIn',
                        exit: 'animated zoomOut'
                    }
                });
                window.setTimeout("location.href=window.location.href", 1000);
            }, 500);
        },
        error: function(exp) {
            setTimeout(function() {
                $.notify({
                    title: '<strong>发生错误</strong>',
                    message: exp.status
                }, {
                    type: 'danger',
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    timer: 1500,
                    animate: {
                        enter: 'animated zoomIn',
                        exit: 'animated zoomOut'
                    }
                });
            }, 500);
        }
    });
});
function AddSub(url, jumpurl="") {
    let tmp = window.btoa(url);
    window.location.href = jumpurl + tmp;
}
function Copyconfig(url, id, jumpurl="") {
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        success: function(res) {
            if (res) {
                Swal.fire({
                    type: 'success',
                    title: "获取成功"
                });
                $(id).data('data', res);
            } else {
                Swal.fire({
                    type: 'error',
                    title: "获取失败"
                });
            }
        }
    });
    const clipboard = new ClipboardJS('.copy-config',{
        text: function() {
            return $(id).data('data');
        }
    });
    clipboard.on('success', function(e) {
        if (jumpurl != "") {
            Swal.fire({
                type: 'success',
                title: "复制成功，即将跳转到 APP"
            });
            window.setTimeout(function() {
                window.location.href = jumpurl;
            }, 500);
        } else {
            Swal.fire({
                type: 'success',
                title: "复制成功"
            });
        }
    });
    clipboard.on("error", function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        console.error('Text:', e.text);
    });
}
$("#coupon_input").click(function() {
    $("#coupon_modal").modal('hide');
    $.ajax({
        type: "POST",
        url: "coupon_check",
        dataType: "json",
        data: {
            coupon: $("#coupon").val(),
            shop: shop
        },
        success: function(data) {
            if (data.ret) {
                $("#name").html("商品名称：" + data.name);
                $("#credit").html("优惠额度：" + data.credit);
                $("#total").html("总金额：" + data.total);
                $("#order_modal").modal();
            } else {
                Swal.fire({
                    type: "error",
                    title: data.msg
                });
            }
            ;
        },
        error: function(exp) {
            Swal.fire({
                type: "error",
                title: '发生错误',
                html: data.msg
            });
        }
    });
});
$("#order_input").click(function() {
    if (document.getElementById('autorenew').checked) {
        var autorenew = 1;
    } else {
        var autorenew = 0;
    }
    ;if (document.getElementById('disableothers').checked) {
        var disableothers = 1;
    } else {
        var disableothers = 0;
    }
    $.ajax({
        type: "POST",
        url: "buy",
        dataType: "json",
        data: {
            coupon: $("#coupon").val(),
            shop: shop,
            autorenew: autorenew,
            disableothers: disableothers
        },
        success: function(data) {
            if (data.ret) {
                Swal.fire({
                    type: "success",
                    title: data.msg
                });
                window.setTimeout("location.href='/user'", 1500);
            } else {
                Swal.fire({
                    type: "warning",
                    title: "余额不足",
                    html: data.msg + "<br>请充值足够余额后再来购买套餐~"
                });
            }
        },
        error: function(exp) {
            Swal.fire({
                type: "error",
                title: data.msg + "  发生了错误。"
            });
        }
    });
});
function buyTrafficPackage() {
    $(".buyTrafficPackage").text('购买中').attr('disabled', true);
    $.ajax({
        type: "POST",
        url: "/user/shop/buytrafficpackage",
        dataType: "json",
        data: {
            traffic: $('.touchspin-step').val(),
            price: $('#traffic_price_2').val()
        },
        success: (data)=>{
            if (data.ret) {
                $(".buyTrafficPackage").text('购买').attr('disabled', false);
                Swal.fire({
                    type: 'success',
                    title: data.msg,
                    timer: 1500,
                    showConfirmButton: false
                });
                window.setTimeout("location.href='/user'", 1000);
            } else {
                $(".buyTrafficPackage").text('购买').attr('disabled', false);
                Swal.fire({
                    type: 'error',
                    title: '出错啦',
                    html: data.msg
                });
            }
        }
    });
}
;function payasyougo() {
    $.ajax({
        type: "POST",
        url: "quantitypay",
        dataType: "json",
        data: {},
        success: function(data) {
            if (data.ret) {
                swal.fire({
                    type: 'success',
                    title: data.msg,
                    showCloseButton: false,
                });
                window.setTimeout("location.href='/user'", 1000);
            } else {
                swal.fire({
                    type: 'error',
                    title: '启用失败',
                    showCloseButton: true,
                    text: data.msg
                });
            }
        },
        error: function(exp) {
            swal.fire({
                type: 'error',
                title: '出现错误',
                showCloseButton: true,
                text: data.msg
            });
        }
    });
}
;function urlChange(id, is_mu, rule_id) {
    var site = './node/' + id + '?ismu=' + is_mu + '&relay_rule=' + rule_id;
    if (id == 'guide') {
        var doc = document.getElementById('infoifram').contentWindow.document;
        doc.open();
        doc.write('<img src="../images/node.gif" style="width: 100%;height: 100%; border: none;"/>');
        doc.close();
    } else {
        document.getElementById('infoifram').src = site;
    }
    $("#nodeinfo").modal();
}
$(function() {
    $.fn.modal.Constructor.prototype._enforceFocus = function() {}
    ;
    new ClipboardJS('.copy-modal');
});
$(".copy-modal").click(function() {
    Swal.fire({
        type: "success",
        title: "已复制到剪切板",
        timer: 1000,
        allowOutsideClick: true,
        showConfirmButton: false
    });
});
function UserClassinsufficient() {
    Swal.fire({
        type: "error",
        title: '等级不足',
        html: '您当前套餐等级不支持使用此节点'
    });
}
function changeRegion() {
    var country = $("#region-selector option:selected").val();
    var tag = $(':radio[name="option"]:checked').val();
    param = "&country=" + country + "&tag=" + tag;
    window.location.href = "/user/node?" + param;
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
