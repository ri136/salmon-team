// title画面について
function titleOnLoad(g){
	var bgImageSrc = "./src/img/background01.png"
	objects.bgImage = new ImageBox(0, 0, canvasSize[1], canvasSize[0], "rectangle", bgImageSrc);
}
function titleDraw(g){
	// BackGroundImage
	objects.bgImage.draw();
	
}