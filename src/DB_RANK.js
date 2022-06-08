/**
 * スプレッドシート：rank
 * １列目：girl_id
 * ２列目：rank
 */

/** ランキング更新 **/
const updateRank = (girls) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_RANK
  );
  sheet.deleteRows(2, 10);

  girls.forEach((girl) => {
    const rank = Number(girl.rank);
    const girlId = girl.girlId;
    const targetRow = rank + 1;

    // 順位
    sheet.getRange(targetRow, 1).setValue(rank);
    // ID
    sheet.getRange(targetRow, 2).setValue(girlId);
  });
};

/** ランキング取得 **/
const getRank = () => {
  let results = [];
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_RANK
  );
  for (let i = 1; i <= 11; i++) {
    if (i == 1) {
      // ヘッダー
      continue;
    }

    results.push({
      rank: sheet.getRange(i, 1).getValue(),
      girlId: sheet.getRange(i, 2).getValue(),
    });
  }

  return results;
};
