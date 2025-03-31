const { isInvestmentSpam } = require("../content");

describe("isInvestmentSpam", () => {
  test("投資スパムを正しく検出する", () => {
    const spamText =
      "前澤友作さんのアドバイスで50万円の投資をして、感謝しています！🔥 @investment_guru";
    expect(isInvestmentSpam(spamText)).toBe(true);
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

  test("絵文字が多用されているケース", () => {
    const emojiText = "投資で利益が出ました！🎈🔥📈🎉";
    expect(isInvestmentSpam(emojiText)).toBe(false); // スコア6（金融2 + 絵文字4）なのでfalse
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
