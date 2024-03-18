const fps = 60;
const canvasSize=[480, 640];

const SCENES = {
	title: "タイトル",
	settings: "設定",
	standings: "順位表",
	result: "結果"
};

let g, scene;      // 
let clickPos = []; // クリックされた場所のcanvasからの相対座標が格納される.
let objects = {};  // 

/* Webページ読み込み時の処理 */
window.onload = function() {
	var canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");
	init();
	setInterval("gameloop()", 1000 / fps);
	console.log("maguro oisii");
};

function init(){
	scene = SCENES.title;
	titleOnLoad(g);
	console.log("ebi mo oisii");
}

// マウスクリック イベントリスナー
// canvasに対する相対座標をclickPosに格納する
document.addEventListener("click", function(e){
	var rect = e.target.getBoundingClientRect();
    var y = e.clientY - rect.top;
	var x = e.clientX - rect.left;
	clickPos.push([y,x]);
}, false);


/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ Main
	- gameloop()  1秒に60回ループ
	- update()  数値計算やオブジェクト管理など
	- draw()  描画処理
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

function gameloop() {
	switch(scene){
		case SCENES.title:
			titleDraw(g);
			break;
	}
	update();
	draw();
}

function update() {}

function draw() {}

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ functions
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */