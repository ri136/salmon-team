// title画面について
function titleOnLoad(g){
	// 背景画像
	var bgImg = new Image();
	bgImg.onload = function() {
    	g.drawImage(bgImg, 0, 0, canvasSize[1], canvasSize[0]);
    };
	bgImg.src = "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1k1Ik5.img?w=612&h=408&m=6";
}
function titleDraw(g){

}