var canvas, g;
var fps = 60;

const Scenes = {};

/* Webページ読み込み時の処理 */
onload = function() {
	canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");
	init();
	setInterval("gameloop()", 1000 / fps);

	console.log("maguro oisii");
};

function init() {}

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ Main
	- gameloop()  1秒に60回ループ
	- update()  数値計算やオブジェクト管理など
	- draw()  描画処理
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

function gameloop() {
	update();
	draw();
}

function update() {}

function draw() {}

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ functions
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ classes
	- Sprite  基本的なオブジェクトのクラス
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

class Sprite {
	constructor() {}
}
