/**
 * スプレッドシート：users
 * １列目：user_id
 * ２列目：user_name
 */

/** ユーザー情報追加 **/
const addUserInfo = (userId, displayName) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_USERS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // すでに登録済みのユーザの場合
    if (sheet.getRange(i, 1).getValue() == userId) {
      // ユーザ名だけ更新して処理終了
      sheet.getRange(i, 2).setValue(displayName);
      break;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      // ユーザ情報を書き込み処理終了
      sheet.getRange(i, 1).setValue(userId);
      sheet.getRange(i, 2).setValue(displayName);
      if (i == 2) {
        sheet.getRange(i, 3).setValue(1);
      } else {
        let parallelNo = sheet.getRange(i - 1, 3).getValue();
        if (parallelNo == PARALLEL_NO_MAX) {
          sheet.getRange(i, 3).setValue(1);
        } else {
          sheet.getRange(i, 3).setValue(parallelNo + 1);
        }
      }
      break;
    }
  }
};

/** ユーザ情報取得 **/
const getUserList = () => {
  const results = [];
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_USERS
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
        userId: sheet.getRange(i, 1).getValue(),
        userName:
          sheet.getRange(i, 2).getValue() +
          '(' +
          sheet.getRange(i, 3).getValue() +
          ')',
      });
    }
  }
  return results;
};

/** ユーザ情報取得 **/
const getUserListParallelNo = (parallelNo) => {
  const results = [];
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_USERS
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
    } else if (sheet.getRange(i, 3).getValue() == parallelNo) {
      // 並列番号が一致する場合
      results.push({
        userId: sheet.getRange(i, 1).getValue(),
        userName:
          sheet.getRange(i, 2).getValue() +
          '(' +
          sheet.getRange(i, 3).getValue() +
          ')',
      });
    } else {
      // それ以外の場合
      continue;
    }
  }
  return results;
};

/** ユーザー情報削除 **/
const deleteUserInfo = (userId) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_USERS
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    // 一致するユーザが存在する場合
    if (sheet.getRange(i, 1).getValue() == userId) {
      // ユーザ名だけ更新して処理終了
      sheet.deleteRow(i);
      break;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      // 一致するユーザが存在しないので何もせずに処理終了
      break;
    }
  }
};
