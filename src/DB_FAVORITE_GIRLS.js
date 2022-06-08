/**
 * スプレッドシート：favorite_girls
 * １列目：user_id
 * ２列目：girl_id(可変)
 */

/** ユーザー情報取得 **/
const getFavoriteGirlList = (userId) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_FAVORITE_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      return [];
    }

    // ユーザが一致する場合
    if (sheet.getRange(i, 1).getValue() == userId) {
      const lastColumn = sheet
        .getRange(i, 50)
        .getNextDataCell(SpreadsheetApp.Direction.PREVIOUS)
        .getColumn();
      if (lastColumn === 1) {
        return [];
      } else {
        return sheet.getRange(i, 2, 1, lastColumn - 1).getValues()[0];
      }
    }
  }
  return [];
};

/** お気に入り情報追加 **/
const addFavoriteGIrl = (userId, girlId) => {
  let favoriteGirls = getFavoriteGirlList(userId);
  // 同一IDをリストから削除
  favoriteGirls = favoriteGirls.filter((girls) => girls != girlId);
  // お気に入りリストに追加
  favoriteGirls.push(girlId);

  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_FAVORITE_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // 空白行またはユーザが一致する場合
    if (
      sheet.getRange(i, 1).getValue() == '' ||
      sheet.getRange(i, 1).getValue() == userId
    ) {
      // 女の子情報を書き込む
      sheet.getRange(i, 1).setValue(userId);
      sheet.getRange(i, 2, 1, favoriteGirls.length).setValues([favoriteGirls]);
      break;
    }
  }
};

/** お気に入り情報削除 **/
const removeFavoriteGIrl = (userId, girlId) => {
  const favoriteGirls = getFavoriteGirlList(userId);
  if (favoriteGirls.length === 0) {
    // 存在しない場合は処理終了（存在しないケース）
    return;
  }

  // 同一IDをリストから削除
  const deleteFavoriteGirls = favoriteGirls.filter((girls) => girls != girlId);

  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_FAVORITE_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      // 女の子情報を書き込む

      // 解除後のお気に入り件数が０件の場合
      if (deleteFavoriteGirls.length == 0) {
        // 何もせず処理終了
        return;
      }
      sheet.getRange(i, 1).setValue(userId);
      sheet
        .getRange(i, 2, 1, deleteFavoriteGirls.length)
        .setValues([deleteFavoriteGirls]);
      break;
    }

    // ユーザが一致する場合
    if (sheet.getRange(i, 1).getValue() == userId) {
      // 該当ユーザを行削除
      sheet.deleteRow(i);
      // 行削除を行うため、インデックスをデクリメント
      i--;
      continue;
    }
  }
};

/** お気に入り登録件数チェック **/
function isLimitFavoriteGirl(userId) {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_FAVORITE_GIRLS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      // お気に入り登録していないユーザの場合
      return false;
    }

    // ユーザが一致する場合
    if (sheet.getRange(i, 1).getValue() == userId) {
      return sheet.getRange(i, 4).getValue() != '';
    }
  }
}
