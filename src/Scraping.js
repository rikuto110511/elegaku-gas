/** 女の子の情報を取得する。 **/
const getGirlsList = () => {
  // htmlをテキスト情報にして抽出
  let html = UrlFetchApp.fetch(ELEGAKU_URL_CAST).getContentText('UTF-8');

  // 在籍一覧を取得
  let girls = Parser.data(html)
    .from('<div id="companion_box"')
    .to('<div id')
    .iterate();

  let results = [];
  girls.forEach((girl) => {
    // 情報取得
    const girlIdAndName = getGirlIdAndName(girl);
    const girlId = girlIdAndName[0];
    const girlName = girlIdAndName[1];
    const age = getAge(girl);
    const threeSize = getThreeSize(girl);
    const catchCopy = getCatchCopy(girl);
    const image = getImage(girl);

    results.push({
      girlId: girlId,
      girlName: girlName,
      age: age,
      threeSize: threeSize,
      catchCopy: catchCopy,
      image: image,
    });
  });
  return results;
};
/** ID,名前取得 **/
const getGirlIdAndName = (girl) => {
  const nameNew = Parser.data(girl)
    .from('<div class="name new">')
    .to('</a>')
    .build();
  const girlId = Parser.data(nameNew)
    .from('<a href="/profile/top/castCode/')
    .to('/">')
    .build();
  const girlName = Parser.data(nameNew)
    .from('/">')
    .to('<span class="age"')
    .build();
  return [girlId, girlName];
};
/** 年齢取得 **/
const getAge = (girl) => {
  return Parser.data(girl).from('<span class="age">').to('</span>').build();
};
/** スリーサイズ取得 **/
const getThreeSize = (girl) => {
  return Parser.data(girl).from('<div class="size">').to('</div>').build();
};
/** キャッチコピーを取得 **/
const getCatchCopy = (girl) => {
  return Parser.data(girl).from('<div class="catch">').to('</div>').build();
};
/** 画像URL取得 **/
const getImage = (girl) => {
  const image = Parser.data(girl)
    .from('<div class="g_image">')
    .to('<!-- g_image -->')
    .build();
  return Parser.data(image)
    .from('<img class="rank" src="')
    .to('" alt=')
    .build();
};

/** 出勤情報取得(cron) **/
const getGirlAndTimes = (targetDate) => {
  // htmlをテキスト情報にして抽出
  const ymd = targetDate.split('-');
  const ymdUrl = 'y/' + ymd[0] + '/MM/' + ymd[1] + '/dd/' + ymd[2];
  const html = UrlFetchApp.fetch(ELEGAKU_URL_SCHEDULE + ymdUrl).getContentText(
    'UTF-8'
  );

  // 閲覧対象期間外の場合
  if (html.indexOf('ご指定の日付のスケジュールはご覧いただけません') != -1) {
    return [];
  }

  // 出勤予定が一人もいない場合
  const zeroGirl = Parser.data(html)
    .from('現在出勤予定を調整中です。')
    .to('公開までしばらくお待ちください')
    .build();
  if (zeroGirl.indexOf('<br>') != -1) {
    return [];
  }

  // 在籍一覧を取得
  const girlList = Parser.data(html)
    .from('<div id="companion_box">')
    .to('<img class="rank" ')
    .iterate();
  let girlIdAndTimes = [];
  girlList.forEach((girl) => {
    const time = Parser.data(girl)
      .from('<div class="time">')
      .to('</div>')
      .build()
      .replaceAll('/\\r\\n/g', '')
      .replaceAll('&nbsp;', '')
      .trim();
    const girlId = Parser.data(girl)
      .from('<a href="/profile/top/castCode/')
      .to('/" class="top_image">')
      .build();
    girlIdAndTimes.push({
      girlId: girlId,
      time: time,
    });
  });
  return girlIdAndTimes;
};

/** ランキング取得(cron) **/
const getRanking = () => {
  // htmlをテキスト情報にして抽出
  const html = UrlFetchApp.fetch(ELEGAKU_URL_RANKING).getContentText('UTF-8');
  let results = [];
  // １位～３位を取得
  results.splice(results.length, 0, ...getRankOneTwoThree(html));
  // ４位～５位を取得
  results.splice(results.length, 0, ...getRankFourFive(html));
  // ６位～１０位を取得
  results.splice(results.length, 0, ...getRankOther(html));

  return results;
};

/** １位～３位のIDを取得 **/
const getRankOneTwoThree = (html) => {
  let results = [];
  const oneTwoThree = Parser.data(html)
    .from('<div id="one_three">')
    .to('<!-- one_three -->')
    .build();
  const girls = Parser.data(oneTwoThree)
    .from('<div id="rank_com"')
    .to('<!-- g_image -->')
    .iterate();
  girls.forEach((girl) => {
    const rank = Parser.data(girl)
      .from('<span class="ranking')
      .to('">')
      .build();
    const girlId = Parser.data(girl)
      .from('<a href="/profile/top/castCode/')
      .to('/')
      .build();
    results.push({
      rank: rank,
      girlId: girlId,
    });
  });
  return results;
};

/** ４位～５位のIDを取得 **/
const getRankFourFive = (html) => {
  let results = [];
  const fourFive = Parser.data(html)
    .from('<div id="four_five">')
    .to('<!-- four_five -->')
    .build();
  const girls = Parser.data(fourFive)
    .from('<div id="rank_com"')
    .to('<!-- g_image -->')
    .iterate();
  girls.forEach((girl) => {
    const rank = Parser.data(girl)
      .from('<span class="ranking')
      .to('">')
      .build();
    const girlId = Parser.data(girl)
      .from('<a href="/profile/top/castCode/')
      .to('/')
      .build();
    results.push({
      rank: rank,
      girlId: girlId,
    });
  });
  return results;
};

const getRankOther = (html) => {
  let results = [];
  const other = Parser.data(html)
    .from('<div id="castBox">')
    .to('<!-- mainBox -->')
    .build();

  // console.log(other);
  const num = ['6', '7', '8', '9', '10'];
  num.forEach((n) => {
    const girl = Parser.data(other)
      .from('<img src="//cdn1.fu-kakumei.com/69/pc_bak/images/rank/no' + n)
      .to('<div class="name new">')
      .build();
    const girlId = Parser.data(girl)
      .from('<a href="/profile/top/castCode/')
      .to('/')
      .build();
    results.push({
      rank: n.padStart(2, '0'),
      girlId: girlId,
    });
  });

  return results;
};

/** 新入生取得 **/
const getScrapingNewFace = () => {
  // htmlをテキスト情報にして抽出
  const html = UrlFetchApp.fetch(ELEGAKU_URL_NEW_FACE).getContentText('UTF-8');
  const newFaces = Parser.data(html)
    .from('<div class="g_image">')
    .to('<span>')
    .iterate();

  let results = [];
  newFaces.forEach((girl) => {
    results.push(
      Parser.data(girl)
        .from('<a href="/profile/top/castCode/')
        .to('/" class="top_image">')
        .build()
    );
  });

  return results;
};

/** 動画一覧取得 **/
const getScrapingMovie = () => {
  // htmlをテキスト情報にして抽出
  const html = UrlFetchApp.fetch(ELEGAKU_URL_MOVIE).getContentText('UTF-8');
  const movies = Parser.data(html)
    .from('<article class="movielist">')
    .to('</article>')
    .iterate();

  let results = [];
  movies.forEach((movie) => {
    results.push({
      url:
        'https:' +
        Parser.data(movie)
          .from('<source src="')
          .to('" type="video/mp4">')
          .build(),
      thumbnail: 'https:' + Parser.data(movie).from('poster="').to('"').build(),
      alias: Parser.data(movie).from('<p class="title">').to('</p>').build(),
    });
  });

  return results;
};
