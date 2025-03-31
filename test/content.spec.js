const { isInvestmentSpam } = require("../content");

describe("isInvestmentSpam", () => {
  test("投資スパムを正しく検出する", () => {
    const spamTexts = [
      `毎日必ずチェックするブロガー
        @leslieagbakini
        最初は嘘だと思ったが、的中率が高過ぎて、
        もうインサイダーかと思った（笑）
        疑ってごめんW W👍👍`,

      `この間金欠の友達が突然金持ちになって、
        聞いてみたら、
        @adriancastro510
        👈✅
        という先生と同じ株買ったら、
        数百万円儲かりました。半信半疑でしばらくみてみると、やっぱり本物だった👍😘🙏`,

      `毎日フォローする金融の達人
      @srlb9u
      初めは疑心暗鬼だったが、相場観が鋭すぎて、
      もう市場の動きを先読みする達人かと疑った（笑）
      信じなかった自分を恥じていますW W`,

      `債務を返済し終えましたの返済ができたのは、
      @FarrahySaja1
      さんの豊富な経験から学べました。
      一か八か助言通りに資金配分してみたら、
      860万円の収益を生み出し、残った資金は次の市場参入のために取っておきます！`,
    ];

    spamTexts.forEach((spamText) => {
      expect(isInvestmentSpam(spamText)).toBe(true);
    });
  });

  test("通常のツイートはスパムと判定されない", () => {
    const normalText = "今日は良い天気ですね。公園でランチを食べました。";
    expect(isInvestmentSpam(normalText)).toBe(false);
  });

  test("有名人の名前が複数含まれる場合のスコア計算", () => {
    const celebrityText =
      "堀江貴文さんと前澤友作さんの対談がとても参考になりました";
    expect(isInvestmentSpam(celebrityText)).toBe(false); // スコア4（2 * 2）のみなのでfalse
  });

  test("複合的なスパムパターン", () => {
    const complexSpamText =
      "@money_expert 堀江貴文さんの投資アドバイスで30万円稼げました！感謝です🔥";
    expect(isInvestmentSpam(complexSpamText)).toBe(true); // スコア9以上になるのでtrue
  });

  test("金額パターンのテスト", () => {
    const moneyText = "今月は20万円の収入がありました";
    expect(isInvestmentSpam(moneyText)).toBe(false); // スコア2（金額1 + 金融1）のみなのでfalse
  });
});
