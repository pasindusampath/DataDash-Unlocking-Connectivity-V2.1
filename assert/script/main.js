class Main {
    mobile = '';
    pushId = 'fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g'
    constructor() {
        this.checkPreviousLogin()
        $('#getOtp').click(this.getOtp.bind(this));
        $('#submitOtp').click(this.submitOtp.bind(this));
        $('#getData').click(this.getData.bind(this));
        $('#btn600').click(this.request1.bind(this));
        $('#btn10min').click(this.request2.bind(this));
        $('#btn50mb').click(this.request3.bind(this));
        $('#btn25mb').click(this.request4.bind(this));
    }

    checkPreviousLogin(){
        try {
            let mn = localStorage.getItem('mn');
            if(mn){
                this.getDetails2(mn,1)
            }else {
                setTimeout(function (){
                    $('.loading').css({'display':'none'});
                    $('#myDetails').css({'display':'none'})
                    $('#getDataSection').removeClass('view2')
                    $('.mainSection').removeClass('view')
                    $('#getMobileNo').addClass('view')
                },1000)
            }
        }catch (e){
            console.log(e)
        }

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
                "d="+this.pushId+"&prov" +
                "ider=gms&cosMerge=&pin=" + pass + "&promoCode=",
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            if (((JSON.parse(response)).success) === true) {
                console.log('OK');
                localStorage.setItem('key', ((JSON.parse(response)).data).deviceToken)
                localStorage.setItem('mn', (ob.mobile));
                ob.getDetails()
                $('.mainSection').removeClass('view');
                $('#getDataSection').addClass('view2');
                $('#myDetails').css({"display":"block"});
            }

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

    getData() {
        this.btnTimeout('#getData');
        let item = localStorage.getItem('key');
        this.mobile=localStorage.getItem('mn');
        console.log(item)
        console.log(this.mobile)
        let sent = "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken="+item+"&operator=HUTCH&lob=mobile&conn="+this.mobile+"&primaryConn="+this.mobile+"&prePostType=pre&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=ID&id=3580&category=Selfcare&offerType=stv&price=0.0&name=10%20H-H%20Mins";
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
            let resp = JSON.parse(response);
            console.log(resp)
            if(resp.success===true){
                alert('You will be get Confirm Message Soon')
                ob.getDetails()
            }
        });
    }

    request1() {
        this.btnTimeout('#btn600');
        let data = localStorage.getItem('key');
        this.mobile=localStorage.getItem('mn')
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateLoyaltyOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=" + data + "&operator=HUTCH&lob=mobile&conn=" + this.mobile.slice(1) + "&primaryConn=" + this.mobile.slice(1) + "&prePostType=pre&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=ID&id=3741&category=Selfcare&offerType=stv&price=0.0&name=FREE%20600MB%20Offer",
        };

        $.ajax(settings).done(function (response) {
            let resp = JSON.parse(response);
            if(resp.success===true){
                alert('You will be get Confirm Message Soon')
                ob.getDetails()
            }

        });
    }

    request2(){
        this.btnTimeout('#btn10min')
        let mn = localStorage.getItem('mn');
        let key = localStorage.getItem('key');
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateLoyaltyOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&device" +
                "Version=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken="+key+"&operator=HUTCH&lob=mobile&conn="+mn.slice(1)+"&primaryConn="+mn.slice(1)+"&prePostType=pre&language=en&" +
                "pushId="+this.pushId+"&provider=" +
                "gms&cosMerge=ID&id=3579&category=Selfcare&offerType=stv&price=0.0&name=10%20H-H%20Mins",
        };

        $.ajax(settings).done(function (response) {
            let resp = JSON.parse(response);
            if(resp.success===true){
                alert('You will be get Confirm Message Soon')
            }
        });
    }

    request3(){
        this.btnTimeout('#btn50mb');
        let mn = localStorage.getItem('mn');
        let key = localStorage.getItem('key');
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip"
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&" +
                "deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken="+key+
                "&operator=HUTCH&lob=mobile&conn="+mn.slice(1)+"&primaryConn="+mn.slice(1)+"&prePostT" +
                "ype=pre&language=en&pushId="+this.pushId+"&provider=gms&cosMerge=ID&id=3684&category=" +
                "UAT_SMS&offerType=stv&price=0.0&name=FREE%20-%2050%20MB%20Data",
        };

        $.ajax(settings).done(function (response) {
            if(JSON.parse(response).success===true){
                alert('You Will Be Get A Confirmation SMS shortly')
            }
        });
    }

    request4(){
        let key = localStorage.getItem('key')
        let mn = localStorage.getItem('mn')
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateLoyaltyOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip"
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&" +
                "deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken="+key+"&op" +
                "erator=HUTCH&lob=mobile&conn="+mn+"&primaryConn="+mn+"&prePostType=pre&language=en&pu" +
                "shId="+this.pushId+"&provider=gms&cosMerge=ID&id=3583&category=Selfcare&offerType=stv" +
                "&price=0.0&name=25MB%20Data",
        };

        $.ajax(settings).done(function (response) {
            alert('You Will Be Get Confirmation Message Shortly');
        });
    }

    btnTimeout(btn) {
        $(btn).prop('disabled', true);
        setTimeout(function () {
            $(btn).prop('disabled', false);
        }, 10000);
    }

    getDetails() {
        this.getDetails2(this.mobile)
    }
    getDetails2(mn,fun){
        let data = localStorage.getItem('key');
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/dashboard/readDashboardData",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=" + data + "&operator=HUTCH&lob=mobile&conn=" + mn.slice(1) + "&primaryConn=" + mn.slice(1) + "&prePostType=pre&language=en&pushId="+this.pushId+"&provider=gms&cosMerge=ID",
        };
        $.ajax(settings).done(function (response) {
            let parse = JSON.parse(response);
            if(parse.success===false){return}
            $('.connection-details .mycontainer').empty();
            $('.connection-details .mycontainer').append($(`<p style="text-align: center">Connection Details</p><p>----------------------------------------</p>`));
            let allPb = parse.data.all_pb;
            let profileDetails = parse.data.profileDetails;
            let mno =`<p>MOBILE NO : ${profileDetails.mobile_number}</p><p>&nbsp;</p>`;
            let pkgn =`<p>PACKAGE NAME : ${profileDetails.package_name}</p><p>&nbsp;</p>`;
            let pkgt =`<p>PACKAGE TYPE : ${profileDetails.package_type}</p><p>&nbsp;</p>`;
            let mt =`<p>MEMBER TYPE : ${profileDetails.member_type}</p><p>&nbsp;</p>`;
            let st =`<p>STATUS : ${profileDetails.status}</p><p>&nbsp;</p>`;
            let puk =`<p>PUK Number : ${profileDetails.puk}</p><p>&nbsp;</p>`;
            $('.connection-details .mycontainer').append($(mno))
            $('.connection-details .mycontainer').append($(pkgn))
            $('.connection-details .mycontainer').append($(pkgt))
            $('.connection-details .mycontainer').append($(mt))
            $('.connection-details .mycontainer').append($(st))
            $('.connection-details .mycontainer').append($(puk))
            $('.package-details .mycontainer').empty();
            $('.package-details .mycontainer').append($(`<p style="text-align: center">Package Details</p><p>----------------------------------------</p>`));
            let currentBal = parse.data.currBal;
            let main =`<p>MAIN BALANCE : ${currentBal.main}</p><p>&nbsp;</p>`;
            let loan =`<p>LOAN :  ${currentBal.loan}</p><p>&nbsp;</p>`;
            $('.package-details .mycontainer').eq(0).append($(main))
            $('.package-details .mycontainer').eq(0).append($(loan))
            $.each(allPb, (i, e) => {
                let newVar = `<div><p></p></div>`;
                let prog =`<div class="pkg-prograss"><a>MIN</a><div class="progress-loader"></div><a>MAX</a></div>`;
                let pro =`<div class="progress"></div>`;
                let jq = $(newVar);
                let jqprog = $(prog);
                let jqpro = $(pro);
                jq.append(jqprog)
                let formated = `${e.title.padEnd(20, "")} : ${e.remain_val_st}`;
                jq.children('p').eq(0).text(formated);
                jqprog.children('div').eq(0).append(jqpro)
                jqpro.css({'width':e.precentage+'%'})

                $('.package-details .mycontainer').eq(0).append(jq)
            });
            $('.package-details>div').eq(0).css({'overflow': 'scroll'})
            $('.package-details>div::-webkit-scrollbar').eq(0).css({'width': '0'})
            if(fun===1){
                setTimeout(function (){
                    $('.loading').css({'display':'none'});
                    $('.mainSection').removeClass('view');
                    $('#myDetails').css({'display':'block'});
                    $('#getDataSection').addClass('view2');
                },1500)

            }

        }).fail((a,b,c)=>{
            console.log('Error')
            setTimeout(function (){
                $('.loading').css({'display':'none'});
                $('#myDetails').css({'display':'none'})
                $('#getDataSection').removeClass('view2')
                $('.mainSection').removeClass('view')
                $('#getMobileNo').addClass('view')
            },1500)

        });
    }
}

let ob = new Main();