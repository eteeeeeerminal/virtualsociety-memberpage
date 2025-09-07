/**
 * メンバーページのHTMLを生成
 * @param {Object} allMemberListsByTeam 班ごとのメンバーデータのオブジェクト
 * @return {string} メンバーページのHTML
 */
function generateHTML(allMemberListsByTeam) {
  return `
  <div class="member-page">
    <h1>運営メンバー</h1>
    ${
    Object
      .entries(allMemberListsByTeam)
      .map(
        ([teamName, members]) => generateMemberTeamListHTML(teamName, members)
      )
      .join("")
    }
  </div>
  `
}

/**
 * メンバーページのHTMLを生成
 * @param {string} teamName 班名
 * @param {Array} members メンバーデータの配列
 * @return {string} メンバーページのHTML
 */
function generateMemberTeamListHTML(teamName, members) {
  const teamColor = getTeamColor(teamName);
  const memberCardHTMLList = members
    .map((member) => generateMemberCardHTML(member))
    .join("");
  return `
  <div class="member-team-list ${teamColor}">
    <h2>${teamName}</h2>
    <div class="member-card-list">
      ${memberCardHTMLList}
    </div>
  </div>
  `
}

/**
 * メンバーページのHTMLを生成
 * @param {Object} member メンバーリストのオブジェクト
 * @return {string} メンバーページのHTML
 */
function generateMemberCardHTML(member) {
  const snsLinksHTML = generateSNSLinksHTML(member.snsLinks);
  const teamTagsHTML = generateTeamTagsHTML(member.team1, member.team2);
  return `
  <article class="member-card">
    <div class="member-card__left">
      <img class="member-card__icon" src="${member.iconUrl}" alt="${member.name}のアイコン">
      ${snsLinksHTML}
    </div>
    <div class="member-card__right">
      <div class="member-card__name-container">
        <p class="member-card__name__text">${member.name}</p>
      </div>
      ${teamTagsHTML}
      <p class="member-card__comment">${member.comment}</p>
    </div>
  </article>
  `
}

/**
 * SNSリンクのHTMLを生成
 * @param {Array} snsLinks SNSリンクの配列
 * @return {string} SNSリンクのHTML
 */
function generateSNSLinksHTML(snsLinks) {
  const snsLinksHTML = snsLinks.map((snsLink) => generateSNSLinkHTML(snsLink)).join("");
  return `<ul class="member-card__sns-list">${snsLinksHTML}</ul>`;
}

/**
 * SNSリンクのHTMLを生成
 * @param {string} snsLink SNSリンク
 * @return {string} SNSリンクのHTML
 */
function generateSNSLinkHTML(snsLink) {
  const platform = getSNSPlatform(snsLink);
  const iconURL = getSNSIconURL(snsLink);
  if (!platform || !iconURL) {
    return "";
  }

  return `
  <li class="member-card__sns-list__item">
    <a href="${snsLink}" target="_blank" rel="noopener noreferrer">
      <img src="${iconURL}" alt="${platform}アイコン">
    </a>
  </li>
  `
}

/**
 * 班タグのHTMLを生成
 * @param {string} team1 班名 (null の場合は空文字列)
 * @param {string} team2 班名 (null の場合は空文字列)
 * @return {string} 班タグのHTML
 */
function generateTeamTagsHTML(team1, team2) {
  return `
  <div class="member-card__team-tag">
    ${generateTeamTagHTML(team1)}
    ${generateTeamTagHTML(team2)}
  </div>
  `
}

/**
 * 班タグのHTMLを生成
 * @param {string} team 班名 (null の場合は空文字列)
 * @return {string} 班タグのHTML
 */
function generateTeamTagHTML(team) {
  return team
    ? `<p class="member-card__team-tag__item ${getTeamColor(team)}">${team}</p>`
    : "";
}

/**
 * HTMLエスケープ
 * @param {string} text エスケープするテキスト
 * @return {string} エスケープされたテキスト
 */
function escapeHtmlSafe(text) {
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;")
    .replace(/\//g, "&#47;")
    .replace(/\\/g, "&#92;")
    .replace(/\./g, "&#46;")
    .replace(/#/g, "&#35;")
    .replace(/\n/g, "<br>");
}
