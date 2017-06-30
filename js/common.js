//var ctx="http://localhost:8080/gongan";
//var commonJsUrl="http://localhost:8080/gongan/js/common.js";


//mui.plusReady(function(){
	$(".footer ul li").on("click",function(){
		var index=$(this).index();
		console.log(index)
		if(index==1){
			if(!localStorage.getItem("user")){
				window.location.href="view/login.html";
//				mui.openWindow({
//					url:"view/login.html",
//					id:"login"
//				})
			}else{
				window.location.href="view/deal/faxiezuo.html";
//				mui.openWindow({
//					url:"view/deal/faxiezuo.html",
//					id:"faxiezuo"
//				})
			}
		}else if(index==2){
			if(!localStorage.getItem("user")){
				window.location.href="view/login.html";
//				mui.openWindow({
//					url:"view/login.html",
//					id:"login"
//				})
				
			}else{
				window.location.href="view/deal/daiqianshou.html";
//				mui.openWindow({
//					url:"view/deal/daiqianshou.html",
//					id:"daiqianshou"
//				})
			}
		}else if(index==3){
			//我的
		}
	})
		
	$("#logout").click(function(){
		localStorage.removeItem("user");
//		localStorage.removeItem("password");
		window.location.href="index.html";
	})
//if ('Android' == plus.os.name) {
//		    var first = null;
//		    mui.back = function() {
//		        if (!first) {
//		            first = new Date().getTime();
//		            mui.toast('再按一次退出应用');
//		            setTimeout(function() {
//		                first = null;
//		            }, 2000);
//		        } else {
//		            if (new Date().getTime() - first < 2000) {
//		                plus.runtime.quit();
//		            }
//		        }
//		    }
//		}
		
//})
	
	
//----------------------------------------------------------------------------
	//该方法用于格式化js日期 
Date.prototype.format=function(fmt) {        
    var o = {        
    "M+" : this.getMonth()+1, //月份        
    "d+" : this.getDate(), //日        
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时        
    "H+" : this.getHours(), //小时        
    "m+" : this.getMinutes(), //分        
    "s+" : this.getSeconds(), //秒        
    "q+" : Math.floor((this.getMonth()+3)/3), //季度        
    "S" : this.getMilliseconds() //毫秒        
    };        
    var week = {        
    "0" : "\u65e5",        
    "1" : "\u4e00",        
    "2" : "\u4e8c",        
    "3" : "\u4e09",        
    "4" : "\u56db",        
    "5" : "\u4e94",        
    "6" : "\u516d"       
    };        
    if(/(y+)/.test(fmt)){        
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));        
    }        
    if(/(E+)/.test(fmt)){        
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);        
    }        
    for(var k in o){        
        if(new RegExp("("+ k +")").test(fmt)){        
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));        
        }        
    }        
    return fmt;        
} 
 
//公共分页方法
function commonPager(data,url,callBack){
	var pagerBox = document.getElementById('pager');//下标所在的div
	    $.ajax({
	      	  type: 'POST',
	      	  url: url,
	      	  data: data,
	      	  dataType:"json",
	      	  async:false,
	      	  success: function(data){
 	      		var pager = new Pager({
 	                index: data.page.pageNum,//当前页号
 	                total: data.page.totalPages,//总共有多少页
 	                parent: pagerBox,
 	                onchange: doChangePage
 	            });
	      	  },
	      	  error:function(){
	      		  alert("error");
	      	  }
	  	 });
}
