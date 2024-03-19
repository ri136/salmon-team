// title画面
function titleOnLoad(g){
	objects = {};
	/* 別画面からタイトル画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// タイトル 表示
	const titleWidth = 300;
	const titleHeight = 75;
	objects.title = new TextBox(canvasSize[0]/2-titleWidth/2, 72, titleWidth, titleHeight, "rectangle");

	objects.title.text = "阿弥打";
	objects.title.font = "75px azuki_font";
	let titleColor = "#FFF";
	objects.title.drawText = function(){
		g.font = this.font;
		g.fillStyle = titleColor;
		g.textBaseline = "middle"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX + this.width/2, this.posY + this.height/2); // 中央に文字を配置
	}

	// ボタン配置
	objects.buttons = {};
	// 中央 ボタン(スタート, ランキング, 設定) 共通部分
	//   サイズ
	let buttonWidth = 150;
	let buttonHeight = 40;
	//   色付け
	const buttonColor1 = "rgba(0,0,0,0.5)"; // 塗りつぶす色
	const buttonColor2 = "#FFF"; // 輪郭の色
	const buttonLineWidth  = 1;
	let buttonDraw = function(){
		g.fillStyle = buttonColor1;
		g.strokeStyle = buttonColor2;
		g.lineWidth = buttonLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	};
	//   文字フォント, 文字色
	const buttonTextColor1 = "#fff";
	const buttonTextFont = "18px azuki_font";
	let buttonDrawText = function(){
		g.font = buttonTextFont;
		g.fillStyle = buttonTextColor1;
		g.textBaseline = "middle"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX + this.width/2, this.posY + this.height/2); // 中央に文字を配置
	}

	// objects に追加
	//   startButton
	objects.buttons.startButton   = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*0, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.startButton.draw  = buttonDraw;
	objects.buttons.startButton.drawText = buttonDrawText;
	objects.buttons.startButton.text = "スタート"
	objects.buttons.startButton.onClick = function(){
		this.text = "!"+this.text+"!";
		scene = scenes.game;
		gameOnload();
		return true;
	}
	//   rankingButton
	objects.buttons.rankingButton = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*1, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.rankingButton.draw = buttonDraw;
	objects.buttons.rankingButton.drawText = buttonDrawText;
	objects.buttons.rankingButton.text = "ランキング"
	//   settingButton
	objects.buttons.settingButton = new Button(canvasSize[0]/2-buttonWidth/2, canvasSize[1]/2 + 26 + 55*2, buttonWidth, buttonHeight, "rectangle")
	objects.buttons.settingButton.draw = buttonDraw;
	objects.buttons.settingButton.drawText = buttonDrawText;
	objects.buttons.settingButton.text = "設定"


}
function titleUpdate(){
	/* タイトル画面の動作処理 */
	// クリック処理
	for(let i=0; i<clickPos.length;i++){
		for(btnName in objects.buttons){
			/* オブジェクトに被った場所をクリックしていたらイベントを実行する */
			if(objects.buttons[btnName].isPointInsideShape(clickPos[i][0], clickPos[i][1])){
				let flg = objects.buttons[btnName].onClick(); // 画面遷移がある場合はreturn がtrue
				if(flg){break;}
			}
		}
	}
	clickPos = [];
}
function titleDraw(){
	// BackGroundImage
	objects.bgImage.draw();
	// title
	objects.title.drawText();

	// 中央 ボタン
	objects.buttons.startButton.draw();
	objects.buttons.startButton.drawText();
	objects.buttons.rankingButton.draw();
	objects.buttons.rankingButton.drawText();
	objects.buttons.settingButton.draw();
	objects.buttons.settingButton.drawText();
}

// ゲーム画面
function gameOnload(){
	objects = {};
	input = [];
	/* 別画面からゲーム画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[0], canvasSize[1], "rectangle", bgImageSrc);

	// 例文表示
	// 外枠
	//   サイズ
	const typingBoxWidth = 514;
	const typingBoxHeight = 100;
	//    色
	const typingBoxColor1 = "rgba(0,0,0,0.4)";
	const typingBoxColor2 = "#FFF";
	const typingBoxLineWidth = 1;
	const typingBoxDraw = function(){
		g.fillStyle = typingBoxColor1;
		g.strokeStyle = typingBoxColor2;
		g.lineWidth = typingBoxLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	}
	//     文字
	const typingBoxTextColor1 = "#FFF";
	const typingBoxTextFont = "18px azuki_font";
	const typingBoxdrawText = function(){
		g.font = typingBoxTextFont;
		g.fillStyle = typingBoxTextColor1;
		g.textBaseline = "middle"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX + this.width/2, this.posY + this.height/2); // 中央に文字を配置
	}

	objects.typingBox = new TextBox(canvasSize[0]/2-typingBoxWidth/2, 52, typingBoxWidth, typingBoxHeight, "rectangle", "");
	objects.typingBox.draw = typingBoxDraw;
	objects.typingBox.drawText = typingBoxdrawText;
}
function gameUpdate(){
	/* タイトル画面の動作処理 */
	typingObject.update_typing(input);
	objects.typingBox.text = s;
	typed = objects.typingBox.typed_alphabets;
	
	input = [];
}
function gameDraw(){
	// BackGroundImage
	objects.bgImage.draw();

	// typingBox
	objects.typingBox.draw();
	objects.typingBox.drawText();
}