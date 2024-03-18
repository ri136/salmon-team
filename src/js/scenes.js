// title画面について
function titleOnLoad(g){
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// スタートボタン
	const startButton_width = 100;
	const startButton_height = 30;
	const startButton_color = "#FFFFFF"
	startButton = new Button(canvasSize[0]/2-startButton_width/2, canvasSize[1]/2 + 30, startButton_width, startButton_height, "rectangle", startButton_color)

	objects.startButton = startButton;
}
function titleDraw(g){
	// BackGroundImage
	objects.bgImage.draw();

	// StartButton
	const buttonColor1 = "#fff"
	objects.startButton.draw = function(){
		g.fillStyle = buttonColor1;
		g.fillRect(this.posX, this.posY, this.width, this.height);
	};

	objects.startButton.draw();
}