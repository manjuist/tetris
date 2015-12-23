function els(){}

//生成随机数
els.random = function(min,max){
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
els.color = function(){
	var color = ['#0ff','#f0f','#ff0','#00f','#0f0','#f00','#000'];
	return color[els.random(6)];
};

//事件
els.eventUtil = {
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

els.eventUtil.addHandler(window,'keydown',function(e){
	var event = e || event;
	return event.keyCode;
});

//形状数组
els.ele = [
	[[0,0],[1,0],[0,1],[1,1]],
	[[0,0],[0,1],[0,2],[0,3]],
	[[1,0],[2,0],[0,1],[1,1]],
	[[0,0],[1,0],[1,1],[2,1]],
	[[0,0],[1,0],[2,0],[2,1]],
	[[0,0],[1,0],[1,1],[1,2]],
	[[1,0],[0,1],[1,1],[1,2]]
];

//形状
var Shape = function(){
	//随机获取形状
	this.shape = els.ele[els.random(6)];
	this.color = els.color();
};
	Shape.prototype.self = function(){
		return this;
	};
	Shape.prototype.down = function(){
		if(this.bottomBorder()){
			for(var i = 0; i < 4; i++){
				this.shape[i][1] += 1;
			}
			show.render(show.matrix(this.self()));
		}else{
			clearInterval(timer);
		}
	};
	Shape.prototype.left = function(){
		for(var i = 0; i < 4; i++){
			this.shape[i][0] -= 1;
		}
		show.render(show.matrix(this.self()));
	};
	Shape.prototype.right = function(){
		for(var i = 0; i < 4; i++){
			this.shape[i][0] += 1;
		}
		show.render(show.matrix(this.self()));
	};
	Shape.prototype.leftBorder = function(){
	};
	Shape.prototype.rightBorder = function(){
	};
	Shape.prototype.bottomBorder = function(){
		for(var i = 0; i < 4; i++){
			if(this.shape[i][1] >= show.row - 1){
				return false;
			}
		}
		return true;
	};
	Shape.prototype.rotate = function(){
		var cx = Math.round((this.shape[0][0] + this.shape[1][0] + this.shape[2][0] + this.shape[3][0])/4);
		var cy = Math.round((this.shape[0][1] + this.shape[1][1] + this.shape[2][1] + this.shape[3][1])/4);
		for(var i = 0; i < 4; i++){
			this.shape[i][1] = cx - this.shape[i][1] + cy;
			this.shape[i][0] = cy + this.shape[i][0] - cx;
		}
		show.render(show.matrix(this.self()));
	};

//显示矩阵
var show = {
	row:24,
	col:16,
	element:function(color){
		var div = document.createElement('div');
		if(color){
			div.style.backgroundColor = color;
			return div;
		}else{
			return div;
		}
	},
	matrix:function(shape){
		var temp = [];
		//矩阵
		for(var i = 0; i < 24; i++){
			temp.push(new Array(16));
		}
		if(shape){
			//将形状插入矩阵
			for(var j = 0; j < 4; j++){
				temp[shape.shape[j][1]][shape.shape[j][0]+7] = 1;
			}
		}
		//返回包含矩阵和形状的对象
		return {matrix:temp,shape:shape || {}};
	},
	render:function(matrix){
		var box = document.getElementById('js-game');
		box.innerHTML = "";
		//根据矩阵在页面输出
		for(var i = 0; i < this.row; i++){
			for(var j = 0; j < this.col; j++){
				matrix.matrix[i][j] === 1?
					box.appendChild(this.element(matrix.shape.color)):
					box.appendChild(this.element());
			}
		}
		//返回包含矩阵和形状的对象，供后面位移函数使用
		return matrix;
	}
};

var _shape = show.render(show.matrix(new Shape()));
var timer = setInterval(function(){
	_shape.shape.down();
},1000);

