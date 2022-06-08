/**
 * スプレッドシート：new_face
 * １列目：girl_id
 */

/** 新入生登録 **/
const updateNewFace = (girlId) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_NEW_FACE
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      sheet.getRange(i, 1).setValue(girlId);
      break;
    }
  }
};

/** 新入生削除 **/
const deleteNewFace = () => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_NEW_FACE
  );
  const lastRow = sheet.getLastRow();

  // ヘッダーが最終行の場合
  if (lastRow == 1) {
    // 何もしない
    return;
  }

  sheet.deleteRows(2, lastRow);
};

/** 新入生取得 **/
const getNewFaceList = () => {
  let results = [];
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_NEW_FACE
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      return results;
    } else {
      results.push({ girlId: sheet.getRange(i, 1).getValue() });
    }
  }
};
