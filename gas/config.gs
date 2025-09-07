// 設定ファイル
// TODO: スプレッドシートから読み込む用にする
const config = {
  teamList: [
    {
      name: "実行委員長",
      color: "color-1",
    },
    {
      name: "渉外班",
      color: "color-2",
    },
    {
      name: "出版班",
      color: "color-3",
    },
    {
      name: "Web班",
      color: "color-4",
    },
    {
      name: "UX班",
      color: "color-5",
    },
    {
      name: "広報班",
      color: "color-6",
    },
    {
      name: "配信班",
      color: "color-7",
    },
    {
      name: "会場制作班",
      color: "color-8",
    },
    {
      name: "情報管理班",
      color: "color-9",
    },
    {
      name: "英語対応班",
      color: "color-10",
    },
    {
      name: "デザイン班",
      color: "color-11",
    },
    {
      name: "バーチャル学会班",
      color: "color-12",
    },
    {
      name: "当日スタッフ",
      color: "color-0",
    },
    {
      name: "配信者",
      color: "color-0",
    },
    {
      name: "カメラマン",
      color: "color-0",
    },
    {
      name: "クロージング動画作成",
      color: "color-0",
    },
    {
      name: "その他",
      color: "color-0",
    },
  ],
  // TODO: SNS のアイコン画像適切な URL に差し替え
  supportSNSList: [
    {
      name: "x",
      urlPattern: "https://x.com/([a-zA-Z0-9_]+)",
      iconUrl: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
    },
    {
      name: "instagram",
      urlPattern: "https://www.instagram.com/([a-zA-Z0-9_]+)",
      iconUrl: "https://static.cdninstagram.com/rsrc.php/v3/yt/r/30PrGfR3xhI.png",
    },
    {
      name: "youtube",
      urlPattern: "https://www.youtube.com/([a-zA-Z0-9_]+)",
      iconUrl: "https://www.youtube.com/s/desktop/f0af977c/img/favicon_32x32.png",
    },
    {
      name: "github",
      urlPattern: "https://github.com/([a-zA-Z0-9_]+)",
      iconUrl: "https://github.githubassets.com/favicons/favicon.png",
    },
    {
      name: "webサイト",
      urlPattern: "https://([a-zA-Z0-9_]+)",
      iconUrl: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
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
