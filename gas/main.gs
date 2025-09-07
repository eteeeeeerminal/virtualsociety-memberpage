// main 関数
/**
 * メンバーページを生成
 * @return {boolean} success 成功かどうか
 * @return {string} fileUrl メンバーページのURL
 */
function generateMemberPage() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();

  const memberLists = getAllMemberListsByTeamFromSheet(sheet);

  const html = generateHTML(memberLists);

  const file = DriveApp.createFile("member-page.html", html, "text/html");
  console.log(file.getUrl());

  return {
    success: true,
    fileUrl: file.getUrl(),
  };
}

/**
 * 班ごとにまとめたメンバーデータを返す
 * @param {Object} sheet スプレッドシート
 * @return {Object} 班ごとのメンバーデータのオブジェクト (key: 班名, value: メンバーデータの配列)
 */
function getAllMemberListsByTeamFromSheet(sheet) {
  const sheetValues = sheet.getDataRange().getValues();

  // 1行目はヘッダー行なのでスキップ
  const memberDataList = sheetValues.slice(1).map(getMemberDataFromRow);

  // メンバーリストを班ごとにまとめる
  const memberListsByTeam = memberDataList.reduce((acc, memberData) => {
    const team = memberData.team1;
    if (!acc[team]) {
      acc[team] = [];
    }
    acc[team].push(memberData);
    return acc;
  }, {});

  // config.gs の teamList の順番に従ってソートし、オブジェクトとして返す
  const sortedMemberListsByTeam = Object.fromEntries(
    Object.entries(memberListsByTeam).sort((a, b) => {
      const teamA = a[0];
      const teamB = b[0];
      const teamAIndex = config.teamList.findIndex((team) => team.name === teamA);
      const teamBIndex = config.teamList.findIndex((team) => team.name === teamB);
      return teamAIndex - teamBIndex;
    })
  );

  return sortedMemberListsByTeam;
}


/**
 * 一行のメンバーデータを返す
 * @param {Array} row 一行のデータ
 * @returns {Object} メンバーデータのオブジェクト
 */
function getMemberDataFromRow(row) {
  const name = row[0];
  const team1 = row[1];
  const team2 = row[2];
  const comment = row[3];
  const iconUrl = row[4];
  const snsLinks = [row[5], row[6], row[7]].filter((link) => link && link.trim() !== "");

  // TODO: 必要になったらここにバリデーションを追加する

  return {
    name,
    team1,
    team2,
    comment,
    iconUrl,
    snsLinks,
  }
}
