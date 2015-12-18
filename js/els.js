function els(){}

//形状数组
els.ele = [[0x6600],[0x2222,0xf00],[0xc600,0x2640],[0x6c00,0x4620],[0x4460,0x2e0,0x6220,0x740],[0x2260,0xe20,0x6440,0x4700],[0x2620,0x720,0x2320,0x2700]];
//形状数组结束

//生成随机数
els.random = function(min,max){
	var len = Array.prototype.slice.call(arguments).length,
		num = (function(len){
			_num = {
				'0':[0,1],
				'1':[0,min],
				'2':[min,max]
			}
			return _num[len];
		}(len));
	return parseInt(Math.random()*(num[1]-num[0]+1)+num[0]);
};
//生成随机数结束

//颜色
els.color = (function(){
	color = ['#0ff','#f0f','#ff0','#00f','#0f0','#f00','#000'];
	return color[els.random(6)];
}());
//颜色结束

//图形生成器
els.shape = function(arr){
	console.log(arr);
	var len = arr.length,
	color = els.color;
	for(var i = 0; i < len; i++){
		var sublen = arr[i].length;
		for(var j = 0; j < len; j++){
			if(arr[i][j] != 0){
				var oldHtml = document.getElementById('gameing').innerHTML;
				document.getElementById('gameing').innerHTML = oldHtml + '<div class="current" style="width: 30px; height: 30px; position: absolute; top: '+i*30+'px; left: '+j*30+'px;background:'+color+';"></div>';
			}
		}
	}
};
//图形生成器结束

//事件
var eventUtil = {
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attchEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.romeveEventListener){
			element.romeveEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type] = null;
		}
	}
};
//事件结束

//选择器
var get = function(selector){
	var first = selector.slice(0,1),
		_selector = selector.slice(1);
	if(first == '#'){
		return document.getElementById(_selector);
	}else if(first == '.'){
		if(document.getElementsByClassName){
			return document.getElementsByClassName(_selector);
		}else{
		}
	}else{
	}
};
//选择器结束

//移动函数
els.move = function(ele,orient){
	if(!ele instanceof Array){
		var tem = [];
		tem.push(ele);
		ele = tem;
	}
	for(var i in ele){
		if((typeof ele[i]).toLowerCase() == 'object'){
		};
	}
	function _right(_ele){
		_ele.style.left = parseInt(document.defaultView?document.defaultView.getComputedStyle(_ele).left:_ele.currentStyle['left']) + 30 + 'px';
	};
	function _bottom(_ele){
		_ele.style.top = parseInt(document.defaultView?document.defaultView.getComputedStyle(_ele).top:_ele.currentStyle['top']) + 30 + 'px';
	};
	function _left(_ele){
		_ele.style.left = parseInt(document.defaultView?document.defaultView.getComputedStyle(_ele).left:_ele.currentStyle['left']) - 30 + 'px';
	};
}
//移动函数结束
els.shape(els.ele[els.random(3)][els.random(1,4)]);

//计时函数
function aa(){ setTimeout(function(){},1000); }
//计时函数结束