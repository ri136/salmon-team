/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ classes
	- Sprite  基本的なオブジェクトのクラス
	  -
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */
class Sprite {
	/* すべてのオブジェクトはこのクラスを継承している */
	constructor(posY, posX, height, width, shape){
		this.posX = posX;
		this.posY = posY;
		this.height = height;
		this.width = width;
		this.shape = "rectangle"; // ellipse: 楕円, rectangle: 長方形

		this.draw = function(){}; // 
	}
	isPointInsideShape(pointY, pointX){
		/* (y,x)がオブジェクト内かを判定する*/ 
		switch(this.shape){
			case "ellipse":
				if (((pointY-this.posY)/this.height)**2+((pointX-this.posX)/this.width)**2 <= 1){
					return true;
				}else{
					return false;
				}
				break;
			case "rectangle":
				if (this.posY<=pointY && pointY<=this.posY+this.height && this.posX<=pointX && pointX<=this.posX+this.width){
					return true;
				}else{
					return false;
				}
				break;
		}
	}
}

// テキストボックス
class TextBox extends Sprite{
	constructor(posY, posX, height, width, shape, text){
		super(posY, posX, height, width, shape);
		this.text = text;
	}
}

// 阿弥陀如来
class Amida extends Sprite{
	constructor(posY, posX, height, width, shape){
		super(posY, posX, height, width, shape);
	}
} 

// 敵
class Enemy extends Sprite{
	constructor(posY, posX, height, width, shape){
		super(posY, posX, height, width, shape);
	}
}

// ボタン
class Button extends Sprite{
	constructor(posY, posX, height, width, shape){
		super(posY, posX, height, width, shape);
	}
}
