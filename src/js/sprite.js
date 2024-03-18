/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ classes
	- Sprite  基本的なオブジェクトのクラス
	  -
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */
class Sprite {
	/* すべてのオブジェクトはこのクラスを継承している (このコメント好き) */
	constructor(posX, posY, width, height, shape){
		this.posX = posX;
		this.posY = posY;
		this.height = height;
		this.width = width;
		this.shape = "rectangle"; // ellipse: 楕円, rectangle: 長方形

		this.draw = function(){}; // 
	}
	isPointInsideShape(pointX, pointY){
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

// 画像
class ImageBox extends Sprite{
	constructor(posX, posY, width, height, shape, src){
		super(posX, posY, width, height, shape);
		let img = new Image();
		img.src = src
		this.draw = function(){
			g.drawImage(img, this.posX, this.posY, this.width, this.height);
		};
	}
}

// テキストボックス
class TextBox extends Sprite{
	constructor(posX, posY, width, height, shape, text){
		super(posX, posY, width, height, shape);
		this.text = text;
	}
}

// 阿弥陀如来
class Amida extends Sprite{
	constructor(posX, posY, width, height, shape){
		super(posX, posY, width, height, shape);
	}
} 

// 敵
class Enemy extends Sprite{
	constructor(posX, posY, width, height, shape){
		super(posX, posY, width, height, shape);
	}
}

// ボタン
class Button extends Sprite{
	constructor(posX, posY, width, height, shape){
		super(posX, posY, width, height, shape);
	}
}
