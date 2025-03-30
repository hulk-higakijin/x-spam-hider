// detector.js の中身を埋め込み or 別ファイルとして読み込まれる前提
// この例では detector.js の中身を直接コピーして一体化してもOK！

// === スパム判定ロジック ===
function isInvestmentSpam(text) {
  const celebrityKeywords = [
    "前澤友作",
    "高橋洋一",
    "堀江貴文",
    "ホリエモン",
    "孫正義",
    "森永卓郎",
    "テスタ",
    "成田悠輔",
    "落合陽一",
    "兄",
    "姉",
  ];
  const moneyPattern = /\d{2,4}万円/;
  const mentionPattern = /@\w{3,}/;
  const financeKeywords = [
    "急騰",
    "的中",
    "推奨",
    "観察して",
    "数カ月見て",
    "利益",
    "稼ぎ",
    "儲け",
    "投資",
    "収益",
    "相場",
    "お金",
    "返済",
    "借金",
    "金融商品",
    "金額",
    "余剰金",
    "稼",
    "金銭",
    "投機",
    "取引",
    "一か八か",
    "資本",
    "指数",
    "ブロガー",
  ];
  const gratitudeKeywords = [
    "感謝",
    "ありがとうございます",
    "救われました",
    "アドバイス",
    "おすすめ",
    "オススメ",
    "お勧め",
    "転機",
    "おかげ",
    "お陰",
    "回避",
    "推薦",
    "見解",
    "見識",
    "識見",
  ];
  const suspiciousEmojis = ["🎈", "🔥", "🧡", "💚", "📈", "🎉"];

  let matchScore = 0;

  // キーワードごとにカウント
  const celebrityCount = celebrityKeywords.filter((name) =>
    text.includes(name)
  ).length;
  const financeCount = financeKeywords.filter((word) =>
    text.includes(word)
  ).length;
  const gratitudeCount = gratitudeKeywords.filter((word) =>
    text.includes(word)
  ).length;
  const emojiCount = suspiciousEmojis.filter((emoji) =>
    text.includes(emoji)
  ).length;

  // スコア計算
  matchScore += celebrityCount * 2;
  matchScore += moneyPattern.test(text) ? 1 : 0;
  matchScore += mentionPattern.test(text) ? 4 : 0;
  matchScore += financeCount;
  matchScore += gratitudeCount;
  matchScore += emojiCount;

  console.log(matchScore);

  return matchScore >= 7;
}

// === リプライ検出・非表示処理 ===
const observer = new MutationObserver(() => {
  const replies = document.querySelectorAll('[data-testid="tweetText"]');
  replies.forEach((reply) => {
    const text = reply.textContent || "";
    if (isInvestmentSpam(text)) {
      const tweet = reply.closest('[data-testid="cellInnerDiv"]');
      if (tweet) {
        tweet.style.display = "none";
        console.log(text);
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
