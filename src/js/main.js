const fps = 60;
const canvasSize=[640, 480];

const scenes = {
	title: "タイトル",
	game: "ゲーム",
	settings: "設定",
	standings: "順位表",
	result: "結果"
};

let g, scene;      // 
let clickPos = []; // クリックされた場所のcanvasからの相対座標が格納される.
let objects = {};  // 
let input = []

/* Webページ読み込み時の処理 */
window.onload = function() {
	// canvas
	const canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");
	g.imageSmoothingEnabled = true;
	
	// font読み込み
	//   azuki_font
	var fontFace = new FontFace('azuki_font', 'url(./src/fonts/azuki.ttf)', { style: 'normal', weight: 700});
	fontFace.load().then(function(loadedFace){document.fonts.add(loadedFace);}).catch(function(e){});
	//   07LightNovelPOP
	var fontFace = new FontFace('LightNovelPOP', 'url(./src/fonts/LightNovelPOPv2.otf)', { style: 'normal', weight: 700});
	fontFace.load().then(function(loadedFace){document.fonts.add(loadedFace);}).catch(function(e){});

	// ゲーム開始
	init();
	setInterval("gameloop()", 1000 / fps);
	console.log("maguro oisii");
};

function init(){
	scene = scenes.title;
	titleOnLoad(g);
	console.log("ebi mo oisii");
}

// マウスクリック イベントリスナー
// canvasに対する相対座標をclickPosに格納する
document.addEventListener("click", function(e){
	const rect = e.target.getBoundingClientRect();
    const y = e.clientY - rect.top;
	const x = e.clientX - rect.left;
	clickPos.push([x,y]);
}, false);

// キー入力
document.addEventListener('keypress', function(e){
	input.push(e.key);
});


/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ Main
	- gameloop()  1秒に60回ループ
	- update()  数値計算やオブジェクト管理など
	- draw()  描画処理
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

function gameloop() {
	switch(scene){
		case scenes.title:
			titleUpdate();
			titleDraw();
			break;
		case scenes.game:
			gameUpdate();
			gameDraw();
			break
	}
	update();
	draw();
}

function update() {}

function draw() {}

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ functions
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */