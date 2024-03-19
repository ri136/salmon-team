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
		this.shape = shape; // 当たり判定に使う ellipse: 楕円, rectangle: 長方形
		this.draw = function(){}; //
		this.onClick = function(){return false;}; // クリック時の動作
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
				console.log(this.posY, pointY)
				console.log(this.posY<=pointY, pointY<=this.posY+this.height, this.posX<=pointX, pointX<=this.posX+this.width);
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
		this.img = new Image();
		this.img.src = src;
		this.draw = function(){
			g.drawImage(this.img, this.posX, this.posY, this.width, this.height);
		};
	}
}

// テキストボックス
class TextBox extends Sprite{
	constructor(posX, posY, width, height, shape, text){
		super(posX, posY, width, height, shape);
		this.text = text;
		this.font = "";
		this.drawText = function(){};
	}
}

// 阿弥陀如来
class Amida extends Sprite{
	constructor(posX, posY, width, height, shape, bodyImgSrc){
		super(posX, posY, width, height, shape);
		this.bodyImg = new Image();
		this.bodyImg.src = bodyImgSrc;
		this.draw = function(){
			g.drawImage(this.bodyImg, this.posX, this.posY, this.width, this.height);
		};

		this.health = 3;
		this.heartPosX = 15;
		this.heartPosY = 15;
		this.heartSpace = 30;
		this.heartSize = 22; // 横幅のみ
		this.heartImg = new Image();
		this.heartImg.src = "./src/img/self_heart.png";
		this.healthDraw = function(){
			for(let i=0; i<this.health; i++){
				g.drawImage(this.heartImg, this.heartPosX+i*this.heartSpace, this.heartPosY, this.heartSize, Math.floor(this.heartImg.naturalHeight*(this.heartSize/this.heartImg.naturalWidth)));
			}
		}
	}
} 
// 敵
class Boss extends Sprite{
	constructor(posX, posY, width, height, shape, bodyImgSrc){
		super(posX, posY, width, height, shape);
		this.bodyImg = new Image();
		this.bodyImg.src = bodyImgSrc;
		this.draw = function(){
			g.drawImage(this.bodyImg, this.posX, this.posY, this.width, this.height);
		};
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

		this.text = "";
		this.font = "";
		this.drawText = function(){};
	}
}
