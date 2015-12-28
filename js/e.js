//生成随机数
var random = function(min,max){
	//获取参数个数
	var len = Array.prototype.slice.call(arguments).length,
		//根据参数个数决定随机数取值范围
		num = (function(len){
			var _num = {
				'0':[0,1],
				'1':[0,min],
				'2':[min,max]
			};
			return _num[len];
		}(len));
	//获取随机数
	return parseInt(Math.random()*(num[1]-num[0]+1)+num[0]);
};

//颜色
var color = function(){
	var color = ['#0ff','#f0f','#ff0','#00f','#0f0','#f00','#000'];
	return color[random(6)];
};

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

var element = function(color){
	var div = document.createElement('div');
	if(color){
		div.style.backgroundColor = color;
		return div;
	}else{
		return div;
	}
};

//移动方向
//eventUtil.addHandler(window,'keydown',function(e){
	//var event = e || event;
	//switch(event.keyCode){
		//case 37:{
			//_shape.shape.left();
			//break;
		//}
		//case 38:{
			//_shape.shape.rotate();
			//break;
		//}
		//case 39:{
			//_shape.shape.right();
			//break;
		//}
		//case 40:{
			//_shape.shape.down(5);
			//break;
		//}
	//}
//});

//形状数组
var ele = [ [[0,0],[1,0],[0,1],[1,1]], [[0,0],[0,1],[0,2],[0,3]], [[1,0],[2,0],[0,1],[1,1]], [[0,0],[1,0],[1,1],[2,1]], [[0,0],[1,0],[2,0],[2,1]], [[0,0],[1,0],[1,1],[1,2]], [[1,0],[0,1],[1,1],[1,2]] ];

//matrix
var Matrix = function(option){
	var configure = option || {row:24,col:16};
	this.row = configure.row;
	this.col = configure.col;
	this.squre = null;
	this.theShape = null;
	this.matrix = this.initMatrix();
	this.needNew = false;
};
Matrix.prototype.shape = function(){
	this.theShape = new Shape();
};
Matrix.prototype.render = function(){
	var box = document.getElementById('js-game');
	box.innerHTML = "";
	//根据矩阵在页面输出
	for(var i = 0; i < this.row; i++){
		for(var j = 0; j < this.col; j++){
			this.squre[i][j] === 1?
				box.appendChild(element(this.theShape.color)):
				box.appendChild(element());
		}
	}
};
Matrix.prototype.initMatrix = function(){
	var temp = [];
	//矩阵
	for(var i = 0; i < this.row; i++){
		temp.push(new Array(this.col));
	}
	return temp;
};
Matrix.prototype.merge = function(){
	var temp = this.matrix.slice(0);
	if(this.theShape){
		//将形状插入矩阵
		for(var j = 0; j < 4; j++){
			var a = this.theShape.squre[j][1];
			var b = this.theShape.squre[j][0]+7;
			temp[a][b] = 1;
		}
	}
	//返回包含矩阵和形状的对象
	this.squre = temp;
};

//shape
var Shape = function(){
	this.color = color();
	this.squre = ele[random(6)];
};
Shape.prototype.left = function(){
	for(var i = 0; i < 4; i++){
		this.squre[i][0] -= 1;
	}
};
Shape.prototype.top = function(){
	var cx = Math.round((this.squre[0][0] + this.squre[1][0] + this.squre[2][0] + this.squre[3][0])/4);
	var cy = Math.round((this.squre[0][1] + this.squre[1][1] + this.squre[2][1] + this.squre[3][1])/4);
	for(var i = 0; i < 4; i++){
		var x = this.squre[i][0];
		var y = this.squre[i][1];
		this.squre[i][0] = cx - y + cy;
		this.squre[i][1] = cy + x - cx;
	}
};
Shape.prototype.right = function(){
	for(var i = 0; i < 4; i++){
		this.squre[i][0] += 1;
	}
};
Shape.prototype.down = function(value){
	var val = value || 5;
	for(var i = 0; i < 4; i++){
		this.squre[i][1] += val;
	}
};
Shape.prototype.position = function(){
};
