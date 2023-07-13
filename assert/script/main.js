class Main {
    mobile;
    constructor() {
        $('#getOtp').click(this.getOtp.bind(this));
        $('#submitOtp').click(this.submitOtp.bind(this));
        $('#getData').click(this.getData.bind(this));
    }
    getOtp() {
        $('#getOtp').prop('disabled', true);
        let mn = $('#mobileNo').val();
        if (!(this.validateMobile())) {
            alert("Wrong Number Enter Correct Number");
            $('#getOtp').prop('disabled', false);
            return;
        }
        this.mobile = mn
        this.request(mn);
    }
    submitOtp() {
        let pass = $('#password').val();
        if (!this.validatePassword()) {
            alert('Check Again');
        }
        this.subOtp(pass);
    }
    validatePassword() {
        return (/^\d{5}$/).test($('#password').val())
    }
    validateMobile() {
        let mn = $('#mobileNo').val();
        let s = /^(?:0|94|\+94|0094)?(?:78\d|72\d)\d{6}$/;
        return s.test(mn)
    }
    subOtp(pass) {
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/connection/registerConfirmPin",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&" +
                "deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=&operator=" +
                "&lob=&conn=" + this.mobile + "&primaryConn=" + this.mobile + "&prePostType=&language=en&pushI" +
                "d=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK" +
                "7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&prov" +
                "ider=gms&cosMerge=&pin=" + pass + "&promoCode=",
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            if(((JSON.parse(response)).success)===true){
                console.log('OK');
            }
            console.log(((JSON.parse(response)).data).deviceToken);
            localStorage.setItem('key',((JSON.parse(response)).data).deviceToken)
            $('.mainSection').removeClass('view');
            $('#getDataSection').addClass('view2');
        });
    }
    request(mn) {
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/connection/registerPinSend",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=&operator=&lob=&conn=" + mn + "&primaryConn=" + mn + "&prePostType=&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=&promoCode=",
        };
        $.ajax(settings).done(function (response) {
            let parse = JSON.parse(response);
            console.log(parse.success)
            if (parse.success === true) {
                $('.mainSection').removeClass('view');
                $('#confirmOtp').addClass('view');
            }
        }).fail((a, b, c) => {
            $('#getOtp').prop('disabled', false);
        })
    }
    getData(){
        setTimeout(function(){
            $('#getData').prop('disabled',false);
        }, 30000);
        let item = localStorage.getItem('key');
        let sent ="appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken="+item+"&operator=HUTCH&lob=mobile&conn="+this.mobile.slice(1)+"&primaryConn="+this.mobile.slice(1)+"&prePostType=pre&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=ID&id=3580&category=Selfcare&offerType=stv&price=0.0&name=25MB%20Data";
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateLoyaltyOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Content-Length": sent.length,
                "Host": "oneapp.hutch.lk",
            },
            "data": sent,
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }
}
new Main();