// 設定ファイル
// TODO: スプレッドシートから読み込む用にする
const config = {
  teamList: [
    {
      name: "運営委員長",
      color: "color-1",
    },
    {
      name: "運営総括",
      color: "color-1",
    },
    {
      name: "UX",
      color: "color-2",
    },
    {
      name: "広報",
      color: "color-3",
    },
    {
      name: "講演等企画",
      color: "color-4",
    },
    {
      name: "ウェブ",
      color: "color-5",
    },
    {
      name: "出版",
      color: "color-6",
    },
    {
      name: "配信",
      color: "color-7",
    },
    {
      name: "バーチャル学会班",
      color: "color-12",
    },
  ],
  // 班1 がこの名前のメンバーは外部メンバーとして、運営メンバーとは別枠で表示する (班2 に役割を書く)
  // 外部メンバーの見出しの文言にもこの値を使う
  guestTeamName: "運営協力",
  // TODO: SNS のアイコン画像適切な URL に差し替え
  supportSNSList: [
    {
      name: "x",
      urlPattern: "https://x.com/([a-zA-Z0-9_@]+)",
      iconUrl: "https://www.vconf.org/2026/wp-content/uploads/2026/04/icon_x.png",
    },
    {
      name: "youtube",
      urlPattern: "https://www.youtube.com/([a-zA-Z0-9_@]+)",
      iconUrl: "https://www.vconf.org/2026/wp-content/uploads/2026/04/icon_youtube.png",
    },
    {
      name: "webサイト",
      urlPattern: "https://([a-zA-Z0-9_@]+)",
      iconUrl: "https://www.vconf.org/2026/wp-content/uploads/2026/04/icon_internet.png",
    }
  ]
}

/**
 * 班名から班の色を返す
 * @param {string} teamName 班名
 * @return {string} 班の色 (color-0 はデフォルトの色)
 */
function getTeamColor(teamName) {
  return config.teamList
    .find((team) => team.name === teamName)?.color || "color-0";
}

/**
 * SNSリンクからSNSプラットフォームを返す
 * @param {string} snsLink SNSリンク
 * @return {string | null} SNSプラットフォーム
 */
function getSNSPlatform(snsLink) {
  return config.supportSNSList.find((sns) => snsLink.match(sns.urlPattern))?.name || null;
}
/**
 * SNSリンクからSNSアイコンのURLを返す
 * @param {string} snsLink SNSリンク
 * @return {string | null} SNSアイコンのURL
 */
function getSNSIconURL(snsLink) {
  return config.supportSNSList.find((sns) => snsLink.match(sns.urlPattern))?.iconUrl || null;
}
