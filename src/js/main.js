var g, scene, ;
const fps = 60;

const Scenes = {
	title: "タイトル",
	settings: "設定",
	standings: "順位表",
	result: "結果"
};

/* Webページ読み込み時の処理 */
onload = function() {
	const canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");
	init();
	setInterval("gameloop()", 1000 / fps);
	console.log("maguro oisii");
};

function init(){
	scene = Scenes.title;
}

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ Main
	- gameloop()  1秒に60回ループ
	- update()  数値計算やオブジェクト管理など
	- draw()  描画処理
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

function gameloop() {
	switch(scene){
		case Scenes.title:

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