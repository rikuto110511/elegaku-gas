/**
 * スプレッドシート：girls
 * １列目：girl_id
 * ２列目：girl_name
 * ３列目：age
 * ４列目：three_size
 * ５列目：catch_copy
 * ６列目：image
 */

/** ユーザー情報追加 **/
const addGirlInfo = (girlId, girlName, age, threeSize, catchCopy, image) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // すでに登録済みの女の子の場合
    if (sheet.getRange(i, 1).getValue() == girlId) {
      // 名前～画像を更新
      sheet.getRange(i, 2).setValue(girlName);
      sheet.getRange(i, 3).setValue(age);
      sheet.getRange(i, 4).setValue(threeSize);
      sheet.getRange(i, 5).setValue(catchCopy);
      sheet.getRange(i, 6).setValue(image);
      break;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      // 女の子の情報を書き込み処理終了
      sheet.getRange(i, 1).setValue(girlId);
      sheet.getRange(i, 2).setValue(girlName);
      sheet.getRange(i, 3).setValue(age);
      sheet.getRange(i, 4).setValue(threeSize);
      sheet.getRange(i, 5).setValue(catchCopy);
      sheet.getRange(i, 6).setValue(image);
      break;
    }
  }
};

/** 情報取得 **/
const getGirlList = () => {
  const results = [];
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    if (sheet.getRange(i, 1).getValue() == '') {
      // 空白行の場合
      return results;
    } else {
      // それ以外の場合
      results.push({
        girlId: sheet.getRange(i, 1).getValue(),
        girlNameAndAge:
          sheet.getRange(i, 2).getValue() +
          '(' +
          sheet.getRange(i, 3).getValue() +
          ')',
        threeSize: sheet.getRange(i, 4).getValue(),
        catchCopy: sheet.getRange(i, 5).getValue(),
        image: sheet.getRange(i, 6).getValue(),
      });
    }
  }
  return results;
};

/** 名前取得 */
const getGirlName = (girlId) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i === 1) {
      // ヘッダーのため対象外
      continue;
    }

    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      // 存在しないケース
      return '';
    }

    // IDが一致する場合
    if (sheet.getRange(i, 1).getValue() == girlId) {
      return sheet.getRange(i, 2).getValue();
    }
  }

  // 見つからなかった場合（存在しないケース）
  return '';
};

/** 情報取得 */
const getGirlInfo = (girlId) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i === 1) {
      // ヘッダーのため対象外
      continue;
    }

    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      return;
    }

    // IDが一致する場合
    if (sheet.getRange(i, 1).getValue() == girlId) {
      return {
        girlId: sheet.getRange(i, 1).getValue(),
        girlName: sheet.getRange(i, 2).getValue(),
        age: sheet.getRange(i, 3).getValue(),
        threeSize: sheet.getRange(i, 4).getValue(),
        catchCopy: sheet.getRange(i, 5).getValue(),
        image: sheet.getRange(i, 6).getValue(),
      };
    }
  }
};
