var supportedUser = [];
console.log("Extension is ready");
var userUrl = "https://cdn.rawgit.com/vuquangthinh/refico/master/ref.js";
function reload(){
    $('script[src="' + userUrl + '"]').remove();
    $('<script>').attr('src', userUrl).appendTo('body');
}
reload();
var userData = setInterval(reload,60000);
var support = false;
var user = '';
var readyToBuy = false;
var showMessage = true;
var one = true;
var mess = "Tài khoản không được hỗ trợ bởi UnixCoin Extension. Vui lòng vào group Chợ ICO (<a href='https://www.facebook.com/groups/ChoICO/' _target='blank'>fb.com/groups/ChoICO</a>) để đăng ký";
var modal = "<div class='modal fade' id='choicoModal' role='dialog'> <div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='close' data-dismiss='modal'>&times;</button> <h4 class='modal-title'>UnixCoin Extension</h4><i><h5>Power by:<a href='https://www.facebook.com/groups/ChoICO/' _target='blank'>ChoICO</a></h5></i> </div> <div class='modal-body'>  </div> <div class='modal-footer'> <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button> </div> </div> </div> </div>";
if($("#choicoModal").length === 0){
	$("body").append(modal);
}
// $("#choicoModal div.modal-body").first().html('UnixCoin Extension đã được kích hoạt');
// $("#choicoModal").modal();
var checkInt = setInterval(function(){
    if(supportedUser.length > 0 && user !== ''){
        if($.inArray(user, supportedUser)>-1){
            support = true;
            clearInterval(checkInt);
            clearInterval(userData);
            if(!showMessage && one){
                $("#choicoModal div.modal-body").first().html('Tài khoản ' + user + ' đã được thêm vào danh hỗ trợ bởi UnixCoin Extension.<br />Xin chúc mừng!');
                $("#choicoModal").modal();
                one = false;
            }
        }else{
            if(showMessage){
                if($("#choicoModal").length === 0){
                	$("body").append(modal);
                }
                $("#choicoModal div.modal-body").first().html(mess);
                $("#choicoModal").modal();
                showMessage = false;
            }
        }
    } else if(user === ''){
        var tmp = $("input#ref_url").val();
        if(tmp.indexOf("http") > -1){
            user = tmp.replace(/.*referrer=([^\#]+)/g, "$1");
        }
    }
}, 2000);
var checkU = setInterval(function(){
    if(user === ''){
        var tmp = $("input#ref_url").val();
        if(tmp.indexOf("http") > -1){
            user = tmp.replace(/.*referrer=([^\#]+)/g, "$1");
            clearInterval(checkU);
        }
    }
}, 500);
var linkClick = setInterval(function(){
    if($("a[data-fill]").length && support){
        if($("span.app-buy-all").html() !== '...'){
            $("a[data-fill]").click();
            readyToBuy = true;
            clearInterval(linkClick);
        }
    }
}, 100);
var next_ico_date;
$(document).on({
    ajaxSend: function(e, g, r){
    },
    ajaxComplete: function(e, g, r) {
        console.log('Ajax Completed');
        if(r.url.indexOf('/ico/info') > -1 && g.status === 200){
            next_ico_date = g.responseJSON.next_ico_date;
            console.log('Init Completed');
        }
        if(r.url.indexOf('/user/info') > -1 && g.status === 200){
            user = g.responseJSON.ref_url.replace(/.*referrer=([^\#]+)/g, "$1");
        }
    },
    ajaxStop: function() {
        console.log('Ajax Stop');
    },
    ajaxError: function(e, g, r, a) {
        console.log('Ajax Error');
    }
});
var wait = 1200;
var buyInt = setInterval(function(){
    if(next_ico_date !== undefined && next_ico_date!==null){
        var distance = next_ico_date.from_timestamp - new Date().getTime();
        if(distance < wait && support){
            if($("#unx_amount").val()===''){
                $("a[data-fill]").click();
            }
            $("button[type=submit]").click();
            loopBuy();
            clearInterval(buyInt);
        }
    }
}, 500);
function loopBuy(){
    // var count = 0;
    // var loopInt = setInterval(function(){
    //     if($("#unx_amount").val()===''){
    //         $("a[data-fill]").click();
    //     }
    //     $("button[type=submit]").click();
    //     count++;
    //     if(count>5){
    //         clearInterval(loopInt);
    //     }
    // }, 2500);
}
