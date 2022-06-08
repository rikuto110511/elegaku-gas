/** 出勤情報更新 **/
function cronUpdateSchedule() {
  // 出勤情報を更新
  updateSchedule();
}

/** 出勤情報メッセージ送信(並列処理) **/
function cronPushMessageParallel1() {
  cronPushMessage(1);
}
function cronPushMessageParallel2() {
  cronPushMessage(2);
}
function cronPushMessageParallel3() {
  cronPushMessage(3);
}
function cronPushMessageParallel4() {
  cronPushMessage(4);
}
function cronPushMessageParallel5() {
  cronPushMessage(5);
}
function cronPushMessageParallel6() {
  cronPushMessage(6);
}

/** 出勤情報メッセージ送信 **/
function cronPushMessage(parallelNo) {
  // プッシュ通知
  // 未通知のスケジュールを取得
  const targetSchedule = getSchedule(parallelNo);

  if (targetSchedule.length == 0) {
    // 未通知のスケジュールが存在しない場合終了する。
    return;
  }

  const pushInfo = createPushIndo(parallelNo, targetSchedule);
  pushInfo.forEach((info) => {
    const flexMessage = createNoticeMessage(
      info.systemDateTime,
      info.girlId,
      info.girlNameAndAge,
      info.threeSize,
      info.catchCopy,
      info.image
    );

    pushMessage(info.users, flexMessage);
    updateNoticeFlg(parallelNo, info.systemDate, info.girlId, info.time);
  });
}

/** プッシュ通知 **/
function pushMessage(users, flexMessage) {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: 'Bearer ' + MSG_API_CHANNEL_ACCESS_TOKEN,
  };

  const postData = {
    to: users,
    messages: [
      {
        type: 'flex',
        altText: '出勤情報！',
        contents: flexMessage,
      },
    ],
  };

  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(postData),
  };

  return UrlFetchApp.fetch(MSG_API_URL_MULTICAST, options);
}

/** 出勤情報を更新 **/
const updateSchedule = () => {
  WEEK_PLUS.forEach((n) => {
    let date = new Date();
    date.setDate(date.getDate() + n);
    const targetDate = formatDate(date, FORMAT_YMD);

    // 最新の出勤情報を取得（スクレイピング）
    const girls = getGirlAndTimes(targetDate);

    // 前回出勤⇒今回未出勤の情報を削除
    removeSchedule(targetDate, girls);
    // スプレッドシートに出勤情報を追加
    addSchedule(targetDate, girls);
  });
};

/** プッシュ通知用のメッセージ情報作成 **/
const createPushIndo = (parallelNo, targetSchedule) => {
  const results = [];

  // ユーザ一覧を取得（プッシュ通知対象）
  const users = getUserListParallelNo(parallelNo);
  // 女の子一覧を取得（メッセージ出力用に名前などが必要となるため）
  const girls = getGirlList();

  // プッシュ通知対象のユーザを特定する。
  const userFavoriteGirls = [];
  users.forEach((user) => {
    userFavoriteGirls.push({
      userId: user.userId,
      favoriteGirls: getFavoriteGirlList(user.userId),
    });
  });

  targetSchedule.forEach((target) => {
    let users = [];
    userFavoriteGirls.forEach((user) => {
      if (
        user.favoriteGirls.filter((girl) => girl == target.girlId).length != 0
      ) {
        users.push(user.userId);
      }
    });

    let girl = girls.filter((g) => g.girlId == target.girlId);

    if (users.length !== 0 && girl.length !== 0) {
      girl = girl[0];
      results.push({
        users: users,
        systemDate: target.systemDate,
        time: target.time,
        systemDateTime:
          formatDate(target.systemDate, FORMAT_MD) +
          '(' +
          getDayOfWeek(target.systemDate) +
          ')：' +
          target.time,
        girlId: target.girlId,
        girlNameAndAge: girl.girlNameAndAge,
        threeSize: girl.threeSize,
        catchCopy: girl.catchCopy,
        image: girl.image,
      });
    }
  });
  return results;
};

/** 過去の出勤情報を削除 */
function cronRemoveSchecule() {
  WEEK_MINUS.forEach((n) => {
    let date = new Date();
    date.setDate(date.getDate() + n);
    const baseDate = formatDate(date, FORMAT_YMD);

    // 過去分の出勤情報をスプレッドシートから削除
    removeAllSchedule(baseDate);
  });
}

/** 在籍情報の追加 */
function cronAddGirlInfo() {
  // 在籍一覧取得（スクレイピング）
  const girls = getGirlsList();
  // スプレッドシートのgirlsに書き込む
  girls.forEach((girl) =>
    addGirlInfo(
      girl.girlId,
      girl.girlName,
      girl.age,
      girl.threeSize,
      girl.catchCopy,
      'https:' + girl.image
    )
  );
}

/** ランキングの更新 **/
function cronUpdateRanking() {
  let girls = getRanking();
  updateRank(girls);
}

/** 新入生情報更新 **/
function cronUpdateNewFace() {
  deleteNewFace();

  let girlIds = getScrapingNewFace();
  girlIds.forEach((girlId) => updateNewFace(girlId));
}

/** 動画更新 **/
function cronUpdateMovie() {
  const movies = getScrapingMovie();
  movies.forEach((movie) => {
    const isUpdate = updateMovie(movie);
    if (isUpdate) {
      downloadImages(movie.url);
    }
  });
}

// URLパーサーライブラリ
eval(
  UrlFetchApp.fetch(
    'https://rawgit.com/medialize/URI.js/gh-pages/src/URI.js'
  ).getContentText()
);

/** ファイルダウンロード **/
function downloadImages(url) {
  // 予め作っておいた画像フォルダの情報を取得
  const folders = DriveApp.getFoldersByName('エレガク');
  if (false === folders.hasNext()) {
    return;
  }
  const folder = folders.next();

  // ファイル名取得
  const fileName = URI(url).filename();

  // 画像データを取得
  const response = UrlFetchApp.fetch(url);
  const fileBlob = response.getBlob().setName(fileName);

  // 取得した画像をGoogle Driveにアップロード
  const file = DriveApp.createFile(fileBlob);

  // ルートディレクトリに画像が保存されているので画像フォルダにコピー
  file.makeCopy(file.getName(), folder);

  // ルートディレクトリの画像を削除
  file.setTrashed(true);
}
