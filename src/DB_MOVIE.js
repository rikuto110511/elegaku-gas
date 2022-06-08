/**
 * スプレッドシート：movie
 * １列目：url
 * ２列目：thumbnail
 * ３列目：alias
 */

/** 動画登録 **/
const updateMovie = (movie) => {
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_MOVIE
  );
  for (let i = 1; i <= 10000; i++) {
    // １行目の場合
    if (i == 1) {
      // ヘッダーのため対象外
      continue;
    }

    // urlが一致する場合
    if (sheet.getRange(i, 1).getValue() == movie.url) {
      return false;
    }

    // 空白行の場合
    if (sheet.getRange(i, 1).getValue() == '') {
      sheet.getRange(i, 1).setValue(movie.url);
      sheet.getRange(i, 2).setValue(movie.thumbnail);
      sheet.getRange(i, 3).setValue(movie.alias);
      return true;
    }
  }
};

/** 動画登録 **/
const getMovieList = () => {
  let results = [];
  const sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(
    SPREAD_SHEET_NAME_MOVIE
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
      results.push({
        url: sheet.getRange(i, 1).getValue(),
        thumbnail: sheet.getRange(i, 2).getValue(),
        alias: sheet.getRange(i, 3).getValue(),
      });
    }
  }
};
