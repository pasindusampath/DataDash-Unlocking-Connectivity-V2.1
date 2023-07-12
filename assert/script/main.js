class Main {
    constructor() {
        $('#getOtp').click(this.getOtp.bind(this))
    }

    getOtp(){
        $('#getOtp').prop('disabled', true);
        let mn = $('#mobileNo').val();
        if(!(this.validate())){
            alert("Wrong Number Enter Correct Number");
            $('#getOtp').prop('disabled', false);
            return;
        }
        console.log(mn);
        this.request(mn);
    }
    validate() {
        let mn = $('#mobileNo').val();
        let s = /^(?:0|94|\+94|0094)?(?:78\d)\d{6}$/;
        return s.test(mn)
    }

    request(mn){
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/connection/registerPinSend",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=&operator=&lob=&conn="+mn+"&primaryConn="+mn+"&prePostType=&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=&promoCode=",
        };

        $.ajax(settings).done(function (response) {
            let parse = JSON.parse(response);
            console.log(parse.success)
            if (parse.success===true){
                $('.mainSection').removeClass('view');
                $('#confirmOtp').addClass('view');
            }
        }).fail((a,b,c)=>{
            $('#getOtp').prop('disabled', false);
        })
    }

}
new Main();