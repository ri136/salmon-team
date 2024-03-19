// title画面
function titleOnLoad(g){
	objects = {};
	/* 別画面からタイトル画面へ移動したとき */
	const bgImageSrc = "./src/img/background01.png";
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
	const typingBoxBackGroundWidth = 514;
	const typingBoxBackGroundHeight = 100;
	//    色
	const typingBoxBackGroundColor1 = "rgba(0,0,0,0.4)";
	const typingBoxBackGroundColor2 = "#FFF";
	const typingBoxBackGroundLineWidth = 1;
	const typingBoxBackGroundDraw = function(){
		g.fillStyle = typingBoxBackGroundColor1;
		g.strokeStyle = typingBoxBackGroundColor2;
		g.lineWidth = typingBoxBackGroundLineWidth;
		createRoundRectPath(this.posX, this.posY, this.width, this.height, 4);
		g.fill();
		g.stroke();
	}
	objects.typingBackGroundBox = new TextBox(canvasSize[0]/2-typingBoxBackGroundWidth/2, 52, typingBoxBackGroundWidth, typingBoxBackGroundHeight, "rectangle", "");
	objects.typingBackGroundBox.draw = typingBoxBackGroundDraw;

	// 漢字
	//   サイズ
	const typingBoxSrcTextBoxWidth = 514;
	const typingBoxSrcTextBoxHeight = 18;
	//   文字
	const typingBoxSrcTextBoxColor1 = "#fff";
	const typingBoxSrcTextBoxFont = "18px azuki_font";
	let typingBoxSrcTextBoxDrawText = function(){
		g.font = typingBoxSrcTextBoxFont;
		g.fillStyle = typingBoxSrcTextBoxColor1;
		g.textBaseline = "top"; // 基準をテキストの上下中央に
		g.textAlign = "center"; // 基準をテキストの左右中央に
		g.fillText(this.text, this.posX+this.width/2, this.posY); // 中央に文字を配置
	}
	objects.typingBoxSrcTextBox = new TextBox(canvasSize[0]/2-typingBoxSrcTextBoxWidth/2, 70, typingBoxBackGroundWidth, typingBoxSrcTextBoxHeight, "rectangle", "");
	objects.typingBoxSrcTextBox.drawText = typingBoxSrcTextBoxDrawText;
	// ローマ字
	//   サイズ
	const typingBoxAlpWidth = 514;
	const typingBoxAlpHeight = 18;
	//   文字
	const typingBoxAlpTypedColor1 = "#fff";
	const typingBoxAlpCandidateColor1 = "#aaa";
	const typingBoxAlpFont = "18px azuki_font";
	const typingBoxAlpDrawText = function(){
		// TypedとCandidateのテキストの長さを取得
		g.font = typingBoxAlpFont;
		const typedTextWidth = g.measureText(typingObject.typed_alphabets).width;
		g.font = typingBoxAlpFont;
		const CandidateTextWidth = g.measureText(typingObject.best_alphabets_candidate).width;
		// 描画
		g.textAlign = "left";
		g.textBaseline = "top";
		g.font = typingBoxAlpFont;
		g.fillStyle = typingBoxAlpTypedColor1;
		g.fillText(typingObject.typed_alphabets, this.posX+this.width/2-(typedTextWidth+CandidateTextWidth)/2, this.posY);
		g.font = typingBoxAlpFont;
		g.fillStyle = typingBoxAlpCandidateColor1;
		g.fillText(typingObject.best_alphabets_candidate, this.posX+this.width/2-(-typedTextWidth+CandidateTextWidth)/2, this.posY);
	}
	objects.typingBoxAlp = new TextBox(canvasSize[0]/2-typingBoxAlpWidth/2, 116, typingBoxAlpWidth, typingBoxAlpHeight, "rectangle", "")
	objects.typingBoxAlp.drawText = typingBoxAlpDrawText;

	// キーボード
	const keyBoardImgWidth = 514;
	const keyBoardImgHeight = 174;
	const keyBoardImgSrc = "./src/img/keyboard.png"
	objects.keyBoardImg = new ImageBox(canvasSize[0]/2-keyBoardImgWidth/2, 294, keyBoardImgWidth, keyBoardImgHeight, "rectangle", keyBoardImgSrc);

	// 阿弥陀
	const amidaWidth = 55;
	const amidaHeight = 100;
	const amidaSrc = "./src/img/amida.png"
	objects.amida = new Amida(63, 173, amidaWidth, amidaHeight, "rectangle", amidaSrc);

	// ボス
	const bossWidth = 67;
	const bossHeight = 100;
	const bossSrc = "./src/img/noumen.png";
	objects.boss = new Boss(510, 173, bossWidth, bossHeight, "rectangle", bossSrc);

	// 敵
	objects.enemys = [];

}
function gameUpdate(){
	// 入力し終えたら次の文へ
	if(typingObject.best_alphabets_candidate == ""){	
		// pharaseJson から例文を選ぶ
		const pharase = pharasesJson[Math.floor(Math.random()*pharasesJson.length)];
		console.log(pharase);
		typingObject = new TypingObject(typingJson, pharase[0], pharase[1]);

		// 敵を追加する
		objects.boss.addEnemy();
	}

	// 入力受け取り
	typingObject.update_typing(input);
	objects.typingBoxSrcTextBox.text = typingObject.s;
	input = [];

	// 敵
	for(let i=0; i<objects.enemys.length; i++){
		objects.enemys[i].move();
	}

}
function gameDraw(){
	// BackGroundImage
	objects.bgImage.draw();

	// typingBox
	objects.typingBackGroundBox.draw(); // 背景
	objects.typingBoxSrcTextBox.drawText(); // 漢字
	objects.typingBoxAlp.drawText();

	// keyBoard
	objects.keyBoardImg.draw();

	//amida
	objects.amida.draw();
	objects.amida.healthDraw();

	// boss
	objects.boss.draw();

	// enemy
	for(let i=0; i<objects.enemys.length; i++){
		objects.enemys[i].draw();
	}
}