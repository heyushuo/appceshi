//var ctx="http://127.0.0.1:9090";//服务端ip地址
//var ctx="http://192.168.1.92:8080";
//var ctx="http://localhost:9090";
//var ctx="http://192.168.1.106:9090";
var WSoctPath="192.168.1.106:9090";
var faceUrl="http://172.18.18.72:80"
var ctx="";
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
//js获取url传递过来的参数
function UrlSearch() 
{
   var name,value; 
   var str=location.href; //取得整个地址栏
   var num=str.indexOf("?") 
   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
   var arr=str.split("&"); //各个参数放到数组里
   for(var i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
    if(num>0){ 
     name=arr[i].substring(0,num);
     value=arr[i].substr(num+1);
     this[name]=value;
     } 
    } 
}


//公共弹出框提示
function diaLog(msg){
	layer.msg(msg,{"time":1500});
}


//判断用户是否登录
function validateIsLogin(){
	 if(window.localStorage){
		 var user=localStorage.getItem("user");
		 if (typeof(user) != "undefined"&&user!=null){
			 return true;
		 }else{
			 return false;
		 }
	 }else{
		 return false;
	 }
}
//公共判断状态
function judgeStatus(status){
	var  statusContent="";
	switch (status){
		case 1:
		statusContent="待发起";
			break;
		case 2:
		statusContent="待签收";
			break;
		case 3:
		statusContent="待反馈";
			break;
		case 4:
		statusContent="待评估";
			break;
		case 5:
		statusContent="评估完成";
			break;
		case 6:
		statusContent="申请加分";
			break;
		case 7:
		statusContent="申请加分进行中";
			break;
		case 8:
		statusContent="申请加分结束";
			break;
		case 9:
		statusContent="已发起申诉";
			break;
		case 10:
		statusContent="申诉完成";
			break;
		case 11:
		statusContent="待审批";
			break;
		case 12:
		statusContent="广播关闭";
			break;
		case 13:
		statusContent="已转发";
			break;
		case 14:
		statusContent="已退回";
			break;
		case 15:
		statusContent="审批未通过";
			break;
	};
	return statusContent;
}

//申诉列表状态判断
function appealStatus(status){
	var  statusContent="";
	switch (status){
		case 1:
		statusContent="未处理";
			break;
		case 2:
		statusContent="已通过";
			break;
		case 3:
		statusContent="未通过";
			break;
	};
	return statusContent;
}
//情报小节状态判断
function sectionStatus(status){
	var  sectionContent="";
	switch (status){
		case 0:
			sectionContent="未审批";
			break;
		case 1:
			sectionContent="未通过";
			break;
		case 2:
			sectionContent="待发布";
			break;
		case 3:
			sectionContent="已发布";
			break;
	};
	return sectionContent;
}
//判断协作类型
function typeJudgment(type){
	var  typeContent="";
	switch (type){
		case 1:
		typeContent="落地查询类";
			break;
		case 2:
		typeContent="信息查询类";
			break;
	};
	return typeContent;
}
document.addEventListener('plusready', function(){
	if(localStorage.getItem("user")){
	 	var userInfo=JSON.parse(localStorage.getItem("user"));
	 	var userId=userInfo.id;//发起人id
		//消息推送--------------------------------start
	 	if ('WebSocket' in window) {
	        websocket = new WebSocket("ws://"+WSoctPath+"/gongan/webSocketServer.do?id="+userId);
	    } else if ('MozWebSocket' in window) {
	        websocket = new MozWebSocket("ws://"+WSoctPath+"/webSocketServer.do?id="+userId);
	    } else {
	        websocket = new SockJS("http://"+WSoctPath+"/sockjs/webSocketServer.do?id="+userId);
	    }
	    //连接上时触发
	    websocket.onopen = function (evnt) {
	    };
	    //接收到消息时触发
	    websocket.onmessage = function (evnt) {
	    	var time=0;
	    	var msg=eval('(' + evnt.data + ')');
	    	var list=msg.list;
	    	var b=0;
	      		for(var i=0;i<list.length;i++){
	      				var numRandom=parseInt(Math.random()*1000);
	      				for(var j=0;b==numRandom;j++){
	      					numRandom=parseInt(Math.random()*1000);
	      				};
		      			var d=	new Date();
			  			var item=list[i];
			  			var messageType = item.messageType;//消息的类型
			  			var messageContent="" ;
			  			if(messageType == 2){
			  				messageContent = "待签收";
			  			}else if(messageType == 3){
			  				messageContent = "待反馈";
			  			}else if(messageType == 4){
			  				messageContent = "待评估";
			  			}else if(messageType == 7){
			  				messageContent = "待评审";
			  			}else if(messageType == 9){
			  				messageContent = "待审批申诉";
			  			}else if(messageType == 12){
			  				messageContent = "待审批情报小结";
			  			}else if(messageType == 14){
			  				messageContent = "被退回协作";
			  			}
		      			var message = "您有一条"+messageContent+"事项需要处理！";
		      			setTimeout(function(){
		      				var NotifyID =numRandom;
							var Context = plus.android.importClass("android.content.Context");
							var main = plus.android.runtimeMainActivity();
							var Noti = plus.android.importClass("android.app.Notification");
							var NotificationManager = plus.android.importClass("android.app.NotificationManager");
							var nm = main.getSystemService(Context.NOTIFICATION_SERVICE)
							var Notification = plus.android.importClass("android.app.Notification");
							var mNotification = new Notification.Builder(main);
							mNotification.setOngoing(false);
							mNotification.setContentTitle("Hbuilder")
							mNotification.setContentText(message)
							mNotification.setSmallIcon(17301620)
							mNotification.setTicker(message)
							mNotification.setNumber(10)
							var mNb = mNotification.build()
							nm.notify(NotifyID , mNb);
		      			},time);
		      			time+=3000;
		      			b=numRandom;
		      			var a=window.location.href;
		      			var arr=a.split("/");
		      			var flag=arr.pop();
		      		if(flag==my.html){
		      			$.ajax({
				  	      	  type: 'POST',
				  	      	  url: ctx+"/gongan/app/user/doSelectUser.do?userId="+userId,
				  	      	  dataType:"json",
				  	      	  async:false,
				  	      	  success: function(data){
				  	      		  if (typeof(data) != "undefined"){
				  	      			  $("#userScore").html(data.userScore);//用户的分值 
				  	      			  $("#userRanking").html(data.userRanking);//用户的排名  
				  	      			  $("#userDeptRanking").html(data.userDeptRanking);//用户所在单位的排行   
				  	      			  //用户待签收的协作条数
				  	      			  if(data.toBeSigned==0){
				  	      			  	$(".warn1").css("display","none");
				  	      			  }else{
				  	      			  	$(".warn1").css("display","block");
				  	      			  	$("#toBeSigned").html(data.toBeSigned); 
				  	      			  }
				  	      			  //用户待反馈的协作条数 
				  	      			  if(data.toFeedback==0){
				  	      			  	$(".warn2").css("display","none");
				  	      			  }else{
				  	      			  	$(".warn2").css("display","block");
				  	      			  	 $("#toFeedback").html(data.toFeedback);
				  	      			  }
				  	      			  //用户待评估
				  	      			  if(data.toEvaluation==0){
				  	      			  	$(".warn3").css("display","none");
				  	      			  }else{
				  	      			  	$(".warn3").css("display","block");
				  	      			  	$("#toEvaluation").html(data.toEvaluation);
				  	      			  }
				  	      			  //最下边栏的
				  	      			  if(data.toBeSigned==0){
				  	      			  	$(".warn5").css("display","none");
				  	      			  }else{
				  	      			  	$(".warn5").css("display","block");
				  	      			  	$("#toBeSigned2").html(data.toBeSigned);
				  	      			  }
				  	      			  //待审批
				  	      			  if(data.toExamine==0){
				  	      			  	$(".warn4").css("display","none");
				  	      			  }else{
				  	      			  	$(".warn4").css("display","block").text(data.toExamine);
				  	      			  }
				  	      		  }
				  	      	  },
				  	      	  error:function(){
				  	      		  diaLog("error");
				  	      	  }
			        	 });
		      		}	
		      			
		      			
		      			
		      			
		    };
		    websocket.onerror = function (evnt) {
		    };
		    websocket.onclose = function (evnt) {
		    	window.location.reload();
		    };
	    }
	}
});


