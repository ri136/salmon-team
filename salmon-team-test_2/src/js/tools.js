// canvasで図形を書くための関数
function createRoundRectPath(posX, posY, width, height, radius){
	/* 角丸四角形のパスを作成 */
	g.beginPath();
    g.moveTo(posX + radius, posY);
    g.lineTo(posX + width - radius, posY);
    g.arc(posX + width - radius, posY + radius, radius, Math.PI * (3/2), 0, false);
    g.lineTo(posX + width, posY + height - radius);
    g.arc(posX + width - radius, posY + height - radius, radius, 0, Math.PI * (1/2), false);
    g.lineTo(posX + radius, posY + height);       
    g.arc(posX + radius, posY + height - radius, radius, Math.PI * (1/2), Math.PI, false);
    g.lineTo(posX, posY + radius);
    g.arc(posX + radius, posY + radius, radius, Math.PI, Math.PI * (3/2), false);
    g.closePath();
}