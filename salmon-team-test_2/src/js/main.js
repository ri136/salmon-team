var canvas, g;
var downkeys;
var d;
var typingObject;
var toHiragana;
var phrases;
var isSEPlayed;
var scene;
var bgm, se;

const Scenes = {
	"GamePrepare": "GamePrepare",
	"GameMain": "GameMain"
};

/* Webページ読み込み時の処理 */
onload = async function() {
	canvas = document.getElementById("gamecanvas");
	g = canvas.getContext("2d");

	document.addEventListener('keydown', handleKeyDown);
	await init();
	setInterval("gameloop()", 60);
};

async function init() {
	scene = Scenes.GamePrepare;
	downkeys = [];

	const response = await fetch('src/others/typing.json');
	d = await response.json();

	// const toHiragana = await fetch('src/others/phrases.json');
	// toHiragana = await toHiragana.json();

	toHiragana = {"ハッシュ関数": "はっしゅかんすう", "しゅんかん": "しゅんかん", "形式的べき級数の応用": "けいしきてきべききゅうすうのおうよう", "ご注文はお寿司ですか？": "ごちゅうもんはおすしですか？", "一瞬の油断が命取り": "いっしゅんのゆだんがいのちとり", "エビでタイを釣る": "えびでたいをつる", "極上のパフェ": "ごくじょうのぱふぇ", "マリアナ海溝の調査": "まりあなかいこうのちょうさ", "認識の乖離": "にんしきのかいり", "春夏秋冬": "しゅんかしゅうとう", "こんなことになるとは": "こんなことになるとは",
	"寿司のおいしさの研究": "すしのおいしさの研究", "プリン": "ぷりん", "ヘモグロビン": "へもぐろびん", "カンガルー": "かんがるー", "夕焼け": "ゆうやけ", "瞬間移動ができます": "しゅんかんいどうができます", "これは罠だった": "これはわなだった", "バグ": "ばぐ", "本心": "ほんしん", "イルカのショー": "いるかのしょー", "コーヒーに塩を注ぐ": "こーひーにしおをそそぐ", "致命的なミス": "ちめいてきなみす", "そんなことよりすしたべたい": "そんなことよりすしたべたい", "ユークリッド空間": "ゆーくりっどくうかん",
	"はしゃぎすぎてつかれた": "はしゃぎすぎてつかれた", "サンゴ礁の観察": "さんごしょうのかんさつ", "無理はしないでね": "むりはしないでね", "有料化のお知らせ": "ゆうりょうかのおしらせ", "夢と現実の境界": "ゆめとげんじつのきょうかい", "そんなこと言われたって": "そんなこといわれたって", "本当に寿司はおいしいの？": "ほんとうにすしはおいしいの？", "予想外の出来事": "よそうがいのできごと", "ハンドルネーム": "はんどるねーむ", "相対性理論": "そうたいせいりろん", "睡眠の重要性": "すいみんのじゅうようせい",
	"ホームルーム": "ほーむるーむ", "なつかしのゲーム": "なつかしのゲーム", "青い青い空": "あおいあおいそら", "チキンの大量消費": "ちきんのたいりょうしょうひ", "トンネルを潜り抜ける": "とんねるをくぐりぬける", "作業からは逃れられない": "さぎょうからはのがれられない", "空を飛びたいな": "そらをとびたいな", "ゆっくりしていってね！": "ゆっくりしていってね！", "桜が美しく咲き誇る": "さくらがうつくしくさきほこる", "生麦生米生卵": "なまむぎなまごめなまたまご", "隣の客はよく柿食う客だ": "となりのきゃくはよくかきくうきゃくだ"
	};
	phrases = Object.keys(toHiragana)
	typingObject = null;
}

function handleKeyDown(event) {
	if (scene == Scenes.GamePrepare) {
		scene = Scenes.GameMain;
		bgm = new Audio("src/bgm/cyber10_2.mp3");
		bgm.volume = 0.05;
		bgm.loop = true;
		bgm.play();
	}

	let key = event.key;
	if ((key >= 'a' && key <= 'z') || key === '!' || key === '?' || key === '-') {
		downkeys.push(key);
	} else if (key === 'Escape') {
		// Escキーが押されたときの処理（未実装）
	}
}

function gameloop() {
	update();
	draw();
}

function update() {
	if (scene == Scenes.GamePrepare) {
		;
	} else if (scene == Scenes.GameMain) {
		isSEPlayed = false;
		if (typingObject == null) {
			// てきとうに文章を選ぶ
			var s = randomChoice(phrases);
			typingObject = new TypingObject(d, s, toHiragana[s]);
			console.log("全ての文字:", typingObject.s);
			console.log("打たれていない最適候補:", typingObject.best_alphabets_candidate);
			console.log("すでに正しく打った文字:", typingObject.typed_alphabets);
		}

		if (downkeys.length > 0) {
			before_typed_len = typingObject.typed_alphabets.length;
			typingObject.update_typing(downkeys);
			console.log("全ての文字:", typingObject.s);
			console.log("打たれていない最適候補:", typingObject.best_alphabets_candidate);
			console.log("すでに正しく打った文字:", typingObject.typed_alphabets);

			if (typingObject.typed_alphabets.length - before_typed_len > 0) {
				if (!isSEPlayed) {
					isSEPlayed = true;
					se = new Audio("src/se/typing_sound.wav");
					se.volume = 1;
					se.play();
				}
			}

			if (typingObject.is_all_typed) {
				console.log("Completed!");
				typingObject = null;
			}

			downkeys = [];
		}
	}
}

function draw() {
	if (scene == Scenes.GamePrepare) {
		drawBgColor(g, "#ffffff");
		drawText(g, 320, 240, "Press any key to start", "#000000");

	} else if (scene == Scenes.GameMain) {
		drawBgColor(g, "#ffffff");
		drawText(g, 320, 200, typingObject.s, "#000000");
		drawText(g, 320, 240, typingObject.best_alphabets_candidate, "#888888");
		drawText(g, 320, 280, typingObject.typed_alphabets, "#000000");
	}
}


/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ functions
	- randomChoice(keys)  配列liからランダムに要素を選ぶ
	- drawBgColor(g, color)  背景色を描画
	- drawText(g, x, y, text, color)
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */

function randomChoice(li) {
	keys = Object.keys(li)
	randomKey = keys[Math.floor(Math.random() * keys.length)];
	return li[randomKey]
}

function drawBgColor(g, color) {
	g.fillStyle = color;
	g.fillRect(0,0,640,480);
}

function drawText(g, x, y, text, color) {
	g.fillStyle = color;
	g.font = "16pt Arial";
	g.globalAlpha = 1;
	var Label = text;
	var LabelWidth = g.measureText(Label).width;
	g.fillText(Label, x - LabelWidth/2, y-8);
}





/* ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- o
❁ classes
	- Sprite  基本的なオブジェクトのクラス
	- TypingObject  タイピングの文章やどこまで打ったかを持ってくれてるいいやつ
o ---- o ---- o ---- o ---- o ---- o ---- o ---- o ---- */


class TypingObject {
	constructor(d, s, kana) {
		this.d = d;
		this.s = s;
		this.s_kana = [...kana];

		this.kana_last_idx = 0;
		this.typed_alphabets = "";
		this.candidates = this.get_group_candidates(0, this.s_kana);
		this.best_alphabets_candidate = this.get_untyped_best_candidate(this.kana_last_idx, this.candidates, this.s_kana);
		this.is_all_typed = false;
	}

	get_romazi_candidates(a, b, s_kana) {
		let candidates = [];
		if (a + b - 1 >= s_kana.length) return candidates;

		let nex_kana_group = s_kana.slice(a, a + b).join("");
		if (nex_kana_group in this.d) {
			for (let roma_chara of this.d[nex_kana_group]) candidates.push([roma_chara, b]);
		}

		return candidates;
	}

	get_group_candidates(kana_last_idx, s_kana) {
		let row_a = new Set(["あ", "い", "う", "え", "お"]);
		let row_na = new Set(["な", "に", "ぬ", "ね", "の"]);
		let candidates = [];
		if (s_kana[kana_last_idx] === 'っ' && (kana_last_idx + 1) !== s_kana.length && !(row_a.has(s_kana[kana_last_idx + 1]) || row_na.has(s_kana[kana_last_idx + 1]))) {
			let sub_candidates = [];
			for (let j = 2; j > 0; j--) sub_candidates.push(...this.get_romazi_candidates(kana_last_idx + 1, j, s_kana));
			for (let i of sub_candidates) candidates.push([i[0][0] + i[0], i[1] + 1]);
		} else if (s_kana[kana_last_idx] === 'ん' && (kana_last_idx + 1) !== s_kana.length && !(row_a.has(s_kana[kana_last_idx + 1]) || row_na.has(s_kana[kana_last_idx + 1]))) {
			let sub_candidates = [];
			for (let j = 2; j > 0; j--) sub_candidates.push(...this.get_romazi_candidates(kana_last_idx + 1, j, s_kana));
			for (let i of sub_candidates) candidates.push(['n' + i[0], i[1] + 1]);
		}

		for (let j = 2; j > 0; j--) candidates.push(...this.get_romazi_candidates(kana_last_idx, j, s_kana));

		return candidates;
	}

	get_untyped_best_candidate(kana_last_idx, next_group_candidates, s_kana) {
		let best_untyped_alphabets = "";
		if (next_group_candidates.length > 0) {
			best_untyped_alphabets = next_group_candidates[0][0];
			kana_last_idx += next_group_candidates[0][1];
		}
		while (kana_last_idx < s_kana.length) {
			let best_next_group_candidate = this.get_group_candidates(kana_last_idx, s_kana);
			best_untyped_alphabets += best_next_group_candidate[0][0];
			kana_last_idx += best_next_group_candidate[0][1];
		}

		return best_untyped_alphabets;
	}

	update_typing(input_alphas) {
		for (let input_alpha of input_alphas) {
			if (this.candidates.length === 0) this.candidates = this.get_group_candidates(this.kana_last_idx, this.s_kana);

			let is_typed = false;
			let new_candidates = [];
			for (let i of this.candidates) {
				if (i[0][0] === input_alpha) {
					if (!is_typed) this.typed_alphabets += input_alpha;
					is_typed = true;
					new_candidates.push([i[0].slice(1), i[1]]);
					if (i[0].length === 1) {
						this.kana_last_idx += i[1];
						this.candidates = [];
						break;
					}
				}
			}

			if (this.kana_last_idx >= this.s_kana.length) {
				this.is_all_typed = true;
				break;
			}

			if (this.candidates.length !== 0 && is_typed) this.candidates = new_candidates;
			if (!is_typed) {
				console.log("Wrong :(");
				break;
			}
		}

		this.best_alphabets_candidate = this.get_untyped_best_candidate(this.kana_last_idx, this.candidates, this.s_kana);
	}
}