// detector.js の中身を埋め込み or 別ファイルとして読み込まれる前提
// この例では detector.js の中身を直接コピーして一体化してもOK！

// === スパム判定ロジック ===
function isInvestmentSpam(text) {
  const celebrityKeywords = ['前澤友作', '高橋洋一', '堀江貴文', 'ホリエモン', '孫正義', '森永卓郎', 'テスタ', '成田悠輔', '落合陽一'];
  const moneyPattern = /\d{2,4}万円/;
  const mentionPattern = /@\w{3,}/;
  const financeKeywords = ['急騰', '的中', '推奨', '観察して', '数カ月見て', '利益', '稼ぎ', '儲け'];
  const gratitudeKeywords = ['感謝しています', 'ありがとうございます', '感謝しかない', '救われました'];
  const suspiciousEmojis = ['🎈', '🔥', '🧡', '💚', '📈', '🎉'];

  let matchScore = 0;

  if (celebrityKeywords.some(name => text.includes(name))) matchScore++;
  if (moneyPattern.test(text)) matchScore++;
  if (mentionPattern.test(text)) matchScore++;
  if (financeKeywords.some(word => text.includes(word))) matchScore++;
  if (gratitudeKeywords.some(word => text.includes(word))) matchScore++;
  if (suspiciousEmojis.some(emoji => text.includes(emoji))) matchScore++;

  return matchScore >= 3;
}

// === リプライ検出・非表示処理 ===
const observer = new MutationObserver(() => {
  const replies = document.querySelectorAll('[data-testid="tweetText"]');
  replies.forEach(reply => {
    const text = reply.textContent || "";
    if (isInvestmentSpam(text)) {
      const tweet = reply.closest('[data-testid="cellInnerDiv"]');
      if (tweet) {
        tweet.style.display = 'none';
        // console.log('スパムっぽいリプライを非表示にしました:', text);
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });