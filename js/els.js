function els(){}

//生成随机数
els.random = function(min,max){
	var len = Array.prototype.slice.call(arguments).length,
		num = (function(len){
			var _num = {
				'0':[0,1],
				'1':[0,min],
				'2':[min,max]
			};
			return _num[len];
		}(len));
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
	this.shape = els.ele[els.random(6)];
	this.color = els.color();
};
	Shape.prototype.down = function(){
	};
	Shape.prototype.left = function(){
	};
	Shape.prototype.right = function(){
	};
	Shape.prototype.isBorder = function(){
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
		for(var i = 0; i < 24; i++){
			temp.push(new Array(16));
		}
		if(shape){
			for(var j = 0; j < 4; j++){
				temp[shape.shape[j][1]][shape.shape[j][0]+7] = 1;
			}
		}
		return {matrix:temp,shape:shape || {}};
	},
	render:function(matrix){
		var box = document.getElementById('js-game');
		for(var i = 0; i < this.row; i++){
			for(var j = 0; j < this.col; j++){
				matrix.matrix[i][j] === 1?
					box.appendChild(this.element(matrix.shape.color)):
					box.appendChild(this.element());
			}
		}
	}
};
