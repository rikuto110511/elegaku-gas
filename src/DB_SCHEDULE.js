/**
 * スプレッドシート：schedule
 * １列目：system_date
 * ２列目：girl_id
 * ３列目：time
 * ４列目：notice_flg(0:未通知／1:通知済み)
 */

/** 通知フラグの列番号取得 */
const getNoticeColumn = (parallelNo) => {
  return 3 + parallelNo;
};

/** スケジュール取得（未通知のみ） **/
const getSchedule = (parallelNo) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_SCHEDULE
  );
  let results = [];
  const noticeColumn = getNoticeColumn(parallelNo);

  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      return results;
    }

    if (
      sheet.getRange(i, 3).getValue() != '' &&
      sheet.getRange(i, noticeColumn).getValue() == 0
    ) {
      results.push({
        systemDate: sheet.getRange(i, 1).getValue(),
        girlId: sheet.getRange(i, 2).getValue(),
        time: sheet.getRange(i, 3).getValue(),
      });
    }
  }
  return results;
};

/** スケジュール取得（日付指定あり） **/
const getScheduleTargetDate = (systemDate) => {
  const targetDate = formatDate(systemDate, FORMAT_YMD);
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_SCHEDULE
  );
  let results = [];
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      return results;
    }

    const baseDate = formatDate(sheet.getRange(i, 1).getValue(), FORMAT_YMD);

    if (targetDate == baseDate) {
      results.push({
        systemDate: sheet.getRange(i, 1).getValue(),
        girlId: sheet.getRange(i, 2).getValue(),
        time: sheet.getRange(i, 3).getValue(),
      });
    }
  }
  return results;
};

/** 通知フラグ更新（0 -> 1） */
const updateNoticeFlg = (parallelNo, systemDate, girlId, time) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_SCHEDULE
  );
  const noticeColumn = getNoticeColumn(parallelNo);
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    const sheetSystemDate = sheet.getRange(i, 1);
    const sheetGirlId = sheet.getRange(i, 2);
    const sheetNoticeFlg = sheet.getRange(i, noticeColumn);

    // 空白行の場合
    if (sheetSystemDate.getValue() == '') {
      break;
    }

    // スプレッドシートに日付型で登録されるため比較用に文字列にキャスト
    const baseDate = formatDate(sheetSystemDate.getValue(), FORMAT_YMD);

    // 日付・girlId・時間が一致する場合
    if (
      baseDate == formatDate(systemDate, FORMAT_YMD) &&
      sheetGirlId.getValue() == girlId
    ) {
      // 通知済に更新する
      sheetNoticeFlg.setValue(1);
      break;
    }
  }
};
/** スケジュール追加・更新 **/
const addSchedule = (targetDate, girlIdAndTimes) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_SCHEDULE
  );
  girlIdAndTimes.forEach((girlIdAndTime) => {
    const girlId = girlIdAndTime.girlId;
    const time = girlIdAndTime.time;

    for (let i = 1; i <= 10000; i++) {
      // １行目の場合
      if (i == 1) {
        // ヘッダーのため対象外
        continue;
      }
      const sheetSystemDate = sheet.getRange(i, 1);
      const sheetGirlId = sheet.getRange(i, 2);
      const sheetTime = sheet.getRange(i, 3);
      const sheetNoticeFlg1 = sheet.getRange(i, 4);
      const sheetNoticeFlg2 = sheet.getRange(i, 5);
      const sheetNoticeFlg3 = sheet.getRange(i, 6);
      const sheetNoticeFlg4 = sheet.getRange(i, 7);
      const sheetNoticeFlg5 = sheet.getRange(i, 8);
      const sheetNoticeFlg6 = sheet.getRange(i, 9);

      // 空白行の場合
      if (sheetSystemDate.getValue() == '') {
        // 女の子の情報を書き込む
        sheetSystemDate.setValue(targetDate);
        sheetGirlId.setValue(girlId);
        sheetTime.setValue(time);
        sheetNoticeFlg1.setValue(0);
        sheetNoticeFlg2.setValue(0);
        sheetNoticeFlg3.setValue(0);
        sheetNoticeFlg4.setValue(0);
        sheetNoticeFlg5.setValue(0);
        sheetNoticeFlg6.setValue(0);
        break;
      }

      // スプレッドシートに日付型で登録されるため比較用に文字列にキャスト
      const baseDate = formatDate(sheetSystemDate.getValue(), FORMAT_YMD);

      // 日付が異なる場合
      if (baseDate != targetDate) {
        continue;
      }

      // 日付・girlIdが一致する場合
      if (baseDate == targetDate && sheetGirlId.getValue() == girlId) {
        // 時間が前回と異なる場合
        if (sheetTime.getValue() != time) {
          // 時間・通知フラグだけ更新する
          sheetTime.setValue(time);
          sheetNoticeFlg1.setValue(0);
          sheetNoticeFlg2.setValue(0);
          sheetNoticeFlg3.setValue(0);
          sheetNoticeFlg4.setValue(0);
          sheetNoticeFlg5.setValue(0);
          sheetNoticeFlg6.setValue(0);
        }
        break;
      }
    }
  });
};

/** 過去の出勤情報削除 **/
const removeSchedule = (targetDate, girlIdAndTimes) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_SCHEDULE
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    const sheetSystemDate = sheet.getRange(i, 1).getValue();
    const girlId = sheet.getRange(i, 2).getValue();

    // 空白行の場合
    if (sheetSystemDate == '') {
      break;
    }

    // スプレッドシートに日付型で登録されるため比較用に文字列にキャスト
    const baseDate = formatDate(sheetSystemDate, FORMAT_YMD);

    // 日付一致する場合
    if (targetDate == baseDate) {
      let existsGirl = false;
      for (let j = 0; j < girlIdAndTimes.length; j++) {
        if (girlIdAndTimes[j].girlId == girlId) {
          // 出勤情報が存在する場合
          existsGirl = true;
        }
      }
      if (girlIdAndTimes.length != 0 && !existsGirl) {
        sheet.deleteRow(i);
        // 行削除を行うため、インデックスをデクリメント
        i--;
      }
    }
  }
};

/** 過去の出勤情報削除 **/
const removeAllSchedule = (targetDate) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_SCHEDULE
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }
    const sheetSystemDate = sheet.getRange(i, 1);

    // 空白行の場合
    if (sheetSystemDate.getValue() == '') {
      break;
    }

    // スプレッドシートに日付型で登録されるため比較用に文字列にキャスト
    const baseDate = formatDate(sheetSystemDate.getValue(), FORMAT_YMD);

    // 日付一致する場合
    if (targetDate == baseDate) {
      sheet.deleteRow(i);
      // 行削除を行うため、インデックスをデクリメント
      i--;
    }
  }
};
