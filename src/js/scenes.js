// title画面について
function titleOnLoad(g){
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// ボタン配置
	objects.buttons = {};
	// 中央 ボタン(スタート, ランキング, 設定)
	let buttonWidth = 150;
	let buttonHeight = 40;
	const buttonColor1 = "#FFD29D"; // 塗りつぶす色
	const buttonColor2 = "#AA6819"; // 輪郭の色
	const buttonLineWidth  = 2;
	let buttonDraw = function(){
		g.fillStyle = buttonColor1;
		g.strokeStyle = buttonColor2;
		g.lineWidth = buttonLineWidth;
		g.imageSmoothingEnabled = true;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();

		// g.fillRect(this.posX, this.posY, this.width, this.height);
	};
	objects.buttons.startButton   = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*0, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.startButton.draw   = buttonDraw;
	objects.buttons.rankingButton = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*1, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.rankingButton.draw = buttonDraw;
	objects.buttons.settingButton = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*2, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.settingButton.draw = buttonDraw;


}
function titleDraw(g){
	// BackGroundImage
	objects.bgImage.draw();

	// 中央 ボタン
	objects.buttons.startButton.draw()
	objects.buttons.rankingButton.draw()
	objects.buttons.settingButton.draw()
}