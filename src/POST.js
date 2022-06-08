/** エントリーポイント **/
function doPost(e) {
  const events = JSON.parse(e.postData.contents).events;

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const userId = event.source.userId;
    const replyToken = event.replyToken;

    switch (event.type) {
      case MSG_API_EVENT_FOLLOW: // 友達追加時の処理
        // usersシートにユーザID、名前を追加する。
        addUserInfo(userId, getDisplayName(userId));
        break;
      case MSG_API_EVENT_UNFOLLOW: // 友達解除時の処理
        // usersシートに紐づくユーザーIDが存在する場合削除する。
        deleteUserInfo(userId);
        break;
      case MSG_API_EVENT_MESSAGE: // メッセージ受信時の処理
        // 何もしない。
        break;
      case MSG_API_EVENT_POSTBACK: // ポストバック時の処理
        const postbackData = event.postback.data;
        postbackEvent(userId, replyToken, postbackData);
      default:
        continue;
    }
  }
}

/** ラインの登録名を取得する **/
const getDisplayName = (userId) => {
  const url = MSG_API_URL_PROFILE + userId;
  const userProfile = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + MSG_API_CHANNEL_ACCESS_TOKEN,
    },
  });
  return JSON.parse(userProfile).displayName;
};

/** ポストバックイベント時の処理 **/
const postbackEvent = (userId, replyToken, postbackData) => {
  if (postbackData.indexOf(MSG_POSTBACK_REGISTER) !== -1) {
    postbackEventRegister(userId, replyToken, postbackData);
  } else if (postbackData.indexOf(MSG_POSTBACK_SCHEDULE) !== -1) {
    postbackEventSchedule(replyToken, postbackData);
  } else if (postbackData.indexOf(MSG_POSTBACK_RANKING) !== -1) {
    // richmenu:ランキング選択時
    postbackEventRanking(replyToken);
  } else if (postbackData.indexOf(MSG_POSTBACK_LOCATION) !== -1) {
    // richmenu:地図選択時
    postbackEventLocationLocation(replyToken);
  } else if (postbackData.indexOf(MSG_POSTBACK_SYSTEM) !== -1) {
    // richmenu:料金表選択時
    postbackEventSystem(replyToken);
  } else if (postbackData.indexOf(MSG_POSTBACK_NEW_FACE) !== -1) {
    // richmenu:新入生紹介選択時
    postbackEventNewFace(replyToken);
  } else if (postbackData.indexOf(MSG_POSTBACK_VIDEO) !== -1) {
    // richmenu:動画一覧選択時
    postbackEventMovie(replyToken);
  } else if (postbackData.indexOf(MSG_POSTBACK_MENU_SWITCH) !== -1) {
    // richmenu：メニュー切替時
    // 何もしない
  } else {
    //
    // 上記以外の場合
    // 何もしない
    replyTextMessage(replyToken, '未実装');
  }
};

/** ポストバックイベント：通知登録関連 **/
const postbackEventRegister = (userId, replyToken, postbackData) => {
  const girlId = postbackData.split('=')[1];
  if (postbackData.indexOf(MSG_POSTBACK_ADD) !== -1) {
    // お気に入り追加の場合
    // 手塚さん、西岡は上限無視
    if (
      userId != 'Uaecd779b117dc3612bfc8a8a4ccb79ea' &&
      userId != 'U222c2b0db72bd33ab89cc8e469578eca' &&
      isLimitFavoriteGirl(userId)
    ) {
      replyTextMessage(
        replyToken,
        '申し訳ございません。\nお気に入り登録できるのは３人までです。'
      );
      return;
    }
    addFavoriteGIrl(userId, girlId);
    replyTextMessage(
      replyToken,
      getGirlName(girlId) + 'さんをお気に入り登録しました。'
    );
  } else if (postbackData.indexOf(MSG_POSTBACK_REMOVE) !== -1) {
    // お気に入り削除の場合
    removeFavoriteGIrl(userId, girlId);
    replyTextMessage(
      replyToken,
      getGirlName(girlId) + 'さんをお気に入り解除しました。'
    );
  } else {
    // richmenu:通知登録選択時
    replyFlexMessage(
      replyToken,
      'お気に入り登録',
      createRegisterCarouselMessage(getGirlList(), getFavoriteGirlList(userId))
    );
  }
};

/** ポストバックイベント：出勤情報関連 **/
const postbackEventSchedule = (replyToken, postbackData) => {
  if (postbackData.indexOf(MSG_POSTBACK_DATE) !== -1) {
    // 日付選択時
    const scheduleGirls = getScheduleTargetDate(
      new Date(postbackData.split('=')[1])
    );
    if (scheduleGirls.length == 0) {
      replyTextMessage(
        replyToken,
        '残念ながら出勤予定の女の子いないようです。'
      );
    } else {
      replyFlexMessage(
        replyToken,
        '出勤情報',
        createScheduleGirls(scheduleGirls)
      );
    }
  } else {
    // richmenu:出勤情報選択時
    replyQuickMessage(replyToken);
  }
};

/** ポストバックイベント：新入生紹介関連 **/
const postbackEventNewFace = (replyToken) => {
  // richmenu:新入生紹介選択時
  const newFaces = getNewFaceList();
  if (newFaces.length == 0) {
    replyTextMessage(replyToken, '残念ながら新入生はいないようです。');
  } else {
    replyFlexMessage(
      replyToken,
      '新入生紹介',
      createNewFaceCarouselMessage(newFaces)
    );
  }
};

/** ポストバックイベント：動画一覧関連 **/
const postbackEventMovie = (replyToken) => {
  // richmenu:動画一覧選択時
  // 動画一覧取得
  const movies = getMovieList();
  if (movies.length == 0) {
    replyTextMessage(replyToken, '残念ながら動画は存在しないようです。');
  } else {
    // 動画を返却
    replyFlexMessage(
      replyToken,
      '動画一覧',
      createMovieCarouselMessage(movies)
    );
  }
};

/** ポストバックイベント：ランキング関連 **/
const postbackEventRanking = (replyToken) => {
  const rankList = getRank();
  let rankGirls = [];
  rankList.forEach((rank) => {
    rankGirls.push(getGirlInfo(rank.girlId));
  });

  replyFlexMessage(
    replyToken,
    'ランキング',
    createRankingCarouselMessage(rankGirls)
  );
};

/** ポストバックイベント：地図関連 **/
const postbackEventLocationLocation = (replyToken) => {
  replyLocationMessage(replyToken);
};

/** ポストバックイベント：料金表 **/
const postbackEventSystem = (replyToken) => {
  replyImageMessage(
    replyToken,
    'https://cdn1.fu-kakumei.com/69/pc_bak/images/system/system1.jpg'
  );
};

/** FlexMessage送信 **/
const replyFlexMessage = (replyToken, altText, contents) => {
  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'flex',
        altText: altText,
        contents: contents,
      },
    ],
  };

  replyMessage(postData);
};

/** テキストメッセージ返信 **/
const replyTextMessage = (replyToken, text) => {
  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: text,
      },
    ],
  };

  replyMessage(postData);
};

/** クイックリプライ送信 **/
const replyQuickMessage = (replyToken) => {
  const dates = createQuckReplySchedule();
  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: '選択した日付の出勤情報を確認します。',
        quickReply: {
          items: dates,
        },
      },
    ],
  };

  replyMessage(postData);
};

/** 位置情報送信 **/
const replyLocationMessage = (replyToken) => {
  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'location',
        title: 'エレガンス学院',
        address: '神奈川県川崎市川崎区堀之内町７−８',
        latitude: 35.533641839733406,
        longitude: 139.70597139350963,
      },
    ],
  };

  replyMessage(postData);
};

/** 画像送信 **/
const replyImageMessage = (replyToken, imageUrl) => {
  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'image',
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl,
      },
    ],
  };

  replyMessage(postData);
};

/** 動画送信 **/
const replyMovieMessage = (replyToken, movie) => {
  const postData = {
    replyToken: replyToken,
    messages: [
      {
        type: 'video',
        originalContentUrl: movie.url,
        previewImageUrl: movie.thumbnail,
        trackingId: 'track-id',
      },
    ],
  };

  replyMessage(postData);
};

/** メッセージ送信（共通） **/
const replyMessage = (postData) => {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + MSG_API_CHANNEL_ACCESS_TOKEN,
    },
    payload: JSON.stringify(postData),
  };
  UrlFetchApp.fetch(MSG_API_URL_REPLY, options);
};

/** メッセージ作成 **/
const createScheduleGirls = (girls) => {
  const date = girls[0].systemDate;
  return createScheduleCarouselMessage(
    formatDate(date, FORMAT_MD) + '(' + getDayOfWeek(date) + ')',
    girls
  );
};
