/** 登録画面（カルーセル） **/
const createRegisterCarouselMessage = (girls, favoriteGirls) => {
  let bubbleLength = Math.ceil(girls.length / 5);

  let contents = [];
  let startIndex = 0;
  for (let i = 1; i <= 5; i++) {
    if (i != 5) {
      contents.push(
        createRegisterMessage(
          girls.slice(startIndex, startIndex + bubbleLength),
          favoriteGirls
        )
      );
      startIndex += bubbleLength;
    } else {
      contents.push(
        createRegisterMessage(girls.slice(startIndex), favoriteGirls)
      );
    }
  }

  return {
    type: 'carousel',
    contents: contents,
  };
};

/** 登録画面 **/
const createRegisterMessage = (girls, favoriteGirls) => {
  return {
    type: 'bubble',
    header: createRegisterHeader(),
    body: createRegisterBody(girls, favoriteGirls),
  };
};

/** 登録画面：ヘッダー **/
const createRegisterHeader = () => {
  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'お気に入り登録',
        align: 'center',
        size: 'xl',
        weight: 'bold',
        color: '#F0F0F0',
      },
    ],
    backgroundColor: '#84dcfd',
  };
};

/** 登録画面：ボディー **/
const createRegisterBody = (girls, favoriteGirls) => {
  const contents = [];
  girls.forEach((girl) => {
    const isAdd = favoriteGirls.indexOf(girl.girlId) !== -1;
    contents.push(createRegisterBodySeparator());
    contents.push(
      createRegisterBodyGirlInfo(
        girl.girlId,
        girl.girlNameAndAge,
        girl.threeSize,
        girl.catchCopy,
        girl.image,
        isAdd
      )
    );
    contents.push(createRegisterBodySeparator());
  });

  return {
    type: 'box',
    layout: 'vertical',
    contents: contents,
  };
};

const createRegisterBodyGirlInfo = (
  girlId,
  girlNameAndAge,
  threeSize,
  catchCopy,
  image,
  isAdd
) => {
  return {
    type: 'box',
    layout: 'horizontal',
    contents: [
      {
        type: 'image',
        url: image,
        align: 'start',
        size: 'xs',
        flex: 1,
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: girlNameAndAge,
            weight: 'bold',
            action: {
              type: 'uri',
              label: 'action',
              uri:
                'https://www.elegaku.com/profile/top/castCode/' + girlId + '/',
            },
            color: '#3db3e9',
          },
          {
            type: 'text',
            text: threeSize,
            size: 'xs',
          },
          {
            type: 'text',
            text: catchCopy,
            size: 'xs',
          },
        ],
        flex: 2,
      },
      createRegisterBodyGirlInfoPostbackButton(girlId, isAdd),
    ],
    margin: 'none',
    paddingTop: 'sm',
  };
};

const createRegisterBodyGirlInfoPostbackButton = (girlId, isAdd) => {
  let postbackButton = {};
  if (isAdd) {
    postbackButton = {
      type: 'button',
      action: {
        type: 'postback',
        label: '解除',
        data: 'register:remove=' + girlId,
      },
      flex: 1,
      position: 'relative',
      gravity: 'center',
      style: 'primary',
      color: '#F30100',
      adjustMode: 'shrink-to-fit',
    };
  } else {
    postbackButton = {
      type: 'button',
      action: {
        type: 'postback',
        label: '登録',
        data: 'register:add=' + girlId,
      },
      flex: 1,
      position: 'relative',
      gravity: 'center',
      style: 'primary',
      adjustMode: 'shrink-to-fit',
    };
  }
  return postbackButton;
};

const createRegisterBodySeparator = () => {
  return {
    type: 'separator',
  };
};

/** お知らせ画面 **/
const createNoticeMessage = (
  systemDateTime,
  girlId,
  girlNameAndAge,
  threeSize,
  catchCopy,
  image
) => {
  return {
    type: 'bubble',
    hero: createNoticeHero(systemDateTime, image),
    body: createNoticeBody(girlId, girlNameAndAge, threeSize, catchCopy),
    footer: createNoticeFooter(girlId),
  };
};

/** お知らせ画面：Ｈｅｒｏ？ **/
const createNoticeHero = (systemDateTime, image) => {
  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '出勤情報確定！',
            size: 'lg',
            weight: 'bold',
            align: 'center',
            gravity: 'center',
            color: '#ffffff',
          },
          {
            type: 'text',
            text: systemDateTime,
            color: '#ffffff',
            weight: 'bold',
          },
        ],
        backgroundColor: '#84dcfd',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'none',
        paddingAll: 'md',
      },
      {
        type: 'image',
        url: image,
        aspectMode: 'cover',
        aspectRatio: '185:247',
        size: 'full',
      },
    ],
  };
};

/** お知らせ画面：ボディー **/
const createNoticeBody = (girlId, girlNameAndAge, threeSize, catchCopy) => {
  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: girlNameAndAge,
        size: 'xl',
        color: '#3db3e9',
        action: {
          type: 'uri',
          label: 'action',
          uri: 'https://www.elegaku.com/profile/top/castCode/' + girlId + '/',
        },
      },
      {
        type: 'text',
        text: threeSize,
      },
      {
        type: 'text',
        text: catchCopy,
      },
    ],
    alignItems: 'center',
  };
};

/** お知らせ画面：ボディー **/
const createNoticeFooter = (girlId) => {
  return {
    type: 'box',
    layout: 'horizontal',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        style: 'primary',
        height: 'sm',
        action: {
          type: 'uri',
          label: 'ウェブサイト',
          uri: 'https://www.elegaku.com/profile/top/castCode/' + girlId + '/',
        },
      },
      {
        type: 'button',
        action: {
          type: 'uri',
          uri: 'tel:0442465322',
          label: 'TEL',
        },
        style: 'primary',
        height: 'sm',
        color: '#f3892b',
      },
    ],
    flex: 0,
  };
};

/** ランキング画面（カルーセル） **/
const createRankingCarouselMessage = (girls) => {
  let contents = [];

  contents.push(createRankingOneToFiveMessage(girls));
  contents.push(createRankingSixToTenMessage(girls));

  return {
    type: 'carousel',
    contents: contents,
  };
};

/** ランキング画面（１位～５位） **/
const createRankingOneToFiveMessage = (girls) => {
  const girlOne = girls[0];
  const girlTwo = girls[1];
  const girlThree = girls[2];
  const girlFour = girls[3];
  const girlFive = girls[4];

  return {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'ランキング(1～5位)',
          align: 'center',
          size: 'xl',
          weight: 'bold',
          color: '#F0F0F0',
          adjustMode: 'shrink-to-fit',
        },
      ],
      backgroundColor: '#84dcfd',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no2.png',
                  size: 'xxs',
                  align: 'start',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlTwo.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlTwo.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlTwo.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlTwo.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlTwo.girlId +
                      '/',
                  },
                },
              ],
              paddingTop: 'xl',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no1.png',
                  size: 'xxs',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlOne.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlOne.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlOne.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlOne.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlOne.girlId +
                      '/',
                  },
                },
              ],
              paddingStart: 'xs',
              paddingEnd: 'xs',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no3.png',
                  size: 'xxs',
                  align: 'end',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlThree.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlThree.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlThree.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlThree.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlThree.girlId +
                      '/',
                  },
                },
              ],
              paddingTop: 'xl',
            },
          ],
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          height: '20px',
        },

        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'filler',
              flex: 1,
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no4.png',
                  size: 'xxs',
                  align: 'start',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlFour.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlFour.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlFour.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlFour.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlFour.girlId +
                      '/',
                  },
                },
              ],
              flex: 2,
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no5.png',
                  size: 'xxs',
                  animated: true,
                  align: 'start',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlFive.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlFive.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlFive.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlFive.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlFive.girlId +
                      '/',
                  },
                },
              ],
              flex: 2,
              paddingStart: 'xs',
              paddingEnd: 'xs',
            },
            {
              type: 'filler',
              flex: 1,
            },
          ],
        },
      ],
    },
  };
};

/** ランキング画面（６位～１０位） **/
const createRankingSixToTenMessage = (girls) => {
  const girlSix = girls[5];
  const girlSeven = girls[6];
  const girlEight = girls[7];
  const girlNine = girls[8];
  const girlTen = girls[9];

  return {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'ランキング(6～10位)',
          align: 'center',
          size: 'xl',
          weight: 'bold',
          color: '#F0F0F0',
          adjustMode: 'shrink-to-fit',
        },
      ],
      backgroundColor: '#84dcfd',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no6.png',
                  size: 'xxs',
                  align: 'start',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlSix.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlSix.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlSix.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlSix.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlSix.girlId +
                      '/',
                  },
                },
              ],
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no7.png',
                  size: 'xxs',
                  align: 'start',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlSeven.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlSeven.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlSeven.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlSeven.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlSeven.girlId +
                      '/',
                  },
                },
              ],
              paddingStart: 'xs',
              paddingEnd: 'xs',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no8.png',
                  size: 'xxs',
                  align: 'start',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlEight.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlEight.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlEight.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlEight.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlEight.girlId +
                      '/',
                  },
                },
              ],
            },
          ],
          paddingTop: 'xl',
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          height: '20px',
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no9.png',
                  size: 'xxs',
                  align: 'start',
                  animated: true,
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlNine.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlNine.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlNine.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlNine.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlNine.girlId +
                      '/',
                  },
                },
              ],
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'image',
                  url: 'https://cdn1.fu-kakumei.com/69/pc_bak/images/rank/no10.png',
                  size: 'xxs',
                  animated: true,
                  align: 'start',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: girlTen.image,
                      aspectMode: 'cover',
                      aspectRatio: '185:247',
                    },
                    {
                      type: 'text',
                      text: girlTen.girlName,
                      adjustMode: 'shrink-to-fit',
                      size: 'md',
                      align: 'center',
                      color: '#3db3ec',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlTen.threeSize,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                    {
                      type: 'separator',
                      color: '#ecfe42',
                    },
                    {
                      type: 'text',
                      text: girlTen.catchCopy,
                      align: 'center',
                      adjustMode: 'shrink-to-fit',
                    },
                  ],
                  borderWidth: 'medium',
                  borderColor: '#84dcfd',
                  paddingAll: 'xs',
                  action: {
                    type: 'uri',
                    label: 'action',
                    uri:
                      'https://www.elegaku.com/profile/top/castCode/' +
                      girlTen.girlId +
                      '/',
                  },
                },
              ],
              paddingStart: 'xs',
              paddingEnd: 'xs',
            },
            {
              type: 'filler',
            },
          ],
        },
      ],
    },
  };
};

/** 新入生紹介画面（カルーセル） **/
const createNewFaceCarouselMessage = (girls) => {
  let contents = [];
  let bubbleLength = Math.ceil(girls.length / 6);
  let startIndex = 0;
  for (let i = 1; i <= bubbleLength; i++) {
    if (i != bubbleLength) {
      contents.push(
        createNewFaceMessage(girls.slice(startIndex, startIndex + 6))
      );
      startIndex += 6;
    } else {
      contents.push(createNewFaceMessage(girls.slice(startIndex)));
    }
  }

  return {
    type: 'carousel',
    contents: contents,
  };
};

/** 新入生紹介画面 **/
const createNewFaceMessage = (girls) => {
  let one = [];
  let two = [];

  switch (girls.length) {
    case 0: // 女の子０人（存在しないケース※前段で排除）
      one = [];
      two = [];
    case 1: // 女の子１人
    case 2: // 女の子２人
    case 3: // 女の子３人
      one = girls;
      break;
    case 4: // 女の子４人
    case 5: // 女の子５人
    case 6: // 女の子６人
      one = girls.slice(0, 3);
      two = girls.slice(3);
    default: // それ以外（存在しないケース※前段で排除）
      break;
  }
  return {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          align: 'center',
          size: 'xl',
          weight: 'bold',
          color: '#F0F0F0',
          text: '新入生紹介',
        },
      ],
      backgroundColor: '#84dcfd',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        createNewFaceListBox(one),
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          height: '20px',
        },
        createNewFaceListBox(two),
      ],
    },
  };
};

const createNewFaceListBox = (girls) => {
  let one;
  let two;
  let three;

  switch (girls.length) {
    case 0: // 女の子０人（存在しないケース※前段で排除）
      break;
    case 1: // 女の子１人
      one = girls[0];
      break;
    case 2: // 女の子２人
      one = girls[0];
      two = girls[1];
      break;
    case 3: // 女の子３人
      one = girls[0];
      two = girls[1];
      three = girls[2];
      break;
    default: // それ以外（存在しないケース※前段で排除）
      break;
  }
  return {
    type: 'box',
    layout: 'horizontal',
    contents: [
      createNewFaceBox(one),
      createNewFaceBox(two),
      createNewFaceBox(three),
    ],
  };
};

const createNewFaceBox = (girl) => {
  if (girl == undefined) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [],
      paddingEnd: 'xs',
      flex: 1,
    };
  }
  const girlInfo = getGirlInfo(girl.girlId);

  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'image',
            url: girlInfo.image,
            aspectMode: 'cover',
            aspectRatio: '4:6',
          },
          {
            type: 'text',
            text: girlInfo.girlName,
            adjustMode: 'shrink-to-fit',
            size: 'md',
            align: 'center',
            color: '#3db3ec',
          },
          {
            type: 'separator',
            color: '#ecfe42',
          },
          {
            type: 'text',
            text: girlInfo.threeSize,
            align: 'center',
            adjustMode: 'shrink-to-fit',
          },
          {
            type: 'separator',
            color: '#ecfe42',
          },
          {
            type: 'text',
            text: girlInfo.catchCopy,
            align: 'center',
            adjustMode: 'shrink-to-fit',
          },
        ],
        borderWidth: 'medium',
        borderColor: '#84dcfd',
        paddingAll: 'xs',
        action: {
          type: 'uri',
          label: 'action',
          uri:
            'https://www.elegaku.com/profile/top/castCode/' +
            girlInfo.girlId +
            '/',
        },
      },
    ],
    paddingEnd: 'xs',
    flex: 1,
  };
};

/** 動画一覧画面（カルーセル） **/
const createMovieCarouselMessage = (movies) => {
  let contents = [];
  movies.forEach((movie) => {
    contents.push(createMovieMessage(movie));
  });

  return {
    type: 'carousel',
    contents: contents,
  };
};

/** 動画画面 */
const createMovieMessage = (movie) => {
  return {
    type: 'bubble',
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '動画一覧',
              size: 'lg',
              weight: 'bold',
              align: 'center',
              gravity: 'center',
              color: '#ffffff',
            },
          ],
          backgroundColor: '#84dcfd',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'none',
          paddingAll: 'md',
        },
        {
          type: 'image',
          url: movie.thumbnail,
          aspectMode: 'cover',
          aspectRatio: '185:247',
          size: 'full',
          action: {
            type: 'uri',
            label: 'action',
            uri: movie.url,
          },
        },
        {
          type: 'image',
          url: 'https://icon-note.com/wp-content/uploads/2020/02/icon_file_060.png',
          aspectMode: 'cover',
          position: 'absolute',
          size: 'sm',
          offsetTop: '45%',
          offsetStart: '35%',
          action: {
            type: 'uri',
            label: 'action',
            uri: movie.url,
          },
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: movie.alias,
          weight: 'bold',
          size: 'xl',
          align: 'center',
          color: '#3db3ea',
          action: {
            type: 'uri',
            label: 'action',
            uri: movie.url,
          },
        },
      ],
    },
  };
};

/** 出勤情報画面（カルーセル） **/
const createScheduleCarouselMessage = (displayMD, girls) => {
  let contents = [];
  let bubbleLength = Math.ceil(girls.length / 6);
  let startIndex = 0;
  for (let i = 1; i <= bubbleLength; i++) {
    if (i != bubbleLength) {
      contents.push(
        createScheduleMessage(
          displayMD,
          girls.slice(startIndex, startIndex + 6)
        )
      );
      startIndex += 6;
    } else {
      contents.push(createScheduleMessage(displayMD, girls.slice(startIndex)));
    }
  }

  return {
    type: 'carousel',
    contents: contents,
  };
};

/** 出勤情報画面 **/
const createScheduleMessage = (displayMD, girls) => {
  let one = [];
  let two = [];

  switch (girls.length) {
    case 0: // 女の子０人（存在しないケース※前段で排除）
      one = [];
      two = [];
    case 1: // 女の子１人
    case 2: // 女の子２人
    case 3: // 女の子３人
      one = girls;
      break;
    case 4: // 女の子４人
    case 5: // 女の子５人
    case 6: // 女の子６人
      one = girls.slice(0, 3);
      two = girls.slice(3);
    default: // それ以外（存在しないケース※前段で排除）
      break;
  }
  return {
    type: 'bubble',
    size: 'giga',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          align: 'center',
          size: 'xl',
          weight: 'bold',
          color: '#F0F0F0',
          text: displayMD + 'の出席表',
        },
      ],
      backgroundColor: '#84dcfd',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        createScheduleListBox(one),
        {
          type: 'box',
          layout: 'vertical',
          contents: [],
          height: '20px',
        },
        createScheduleListBox(two),
      ],
    },
  };
};

const createScheduleListBox = (girls) => {
  let one;
  let two;
  let three;

  switch (girls.length) {
    case 0: // 女の子０人（存在しないケース※前段で排除）
      break;
    case 1: // 女の子１人
      one = girls[0];
      break;
    case 2: // 女の子２人
      one = girls[0];
      two = girls[1];
      break;
    case 3: // 女の子３人
      one = girls[0];
      two = girls[1];
      three = girls[2];
      break;
    default: // それ以外（存在しないケース※前段で排除）
      break;
  }
  return {
    type: 'box',
    layout: 'horizontal',
    contents: [
      createScheduleBox(one),
      createScheduleBox(two),
      createScheduleBox(three),
    ],
  };
};

const createScheduleBox = (girl) => {
  if (girl == undefined) {
    return {
      type: 'box',
      layout: 'vertical',
      contents: [],
      paddingEnd: 'xs',
      flex: 1,
    };
  }
  let displayTime;
  if (girl.time == '') {
    displayTime = '出勤予定';
  } else {
    displayTime = girl.time;
  }
  const girlInfo = getGirlInfo(girl.girlId);

  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: displayTime,
            align: 'center',
            color: '#F0F0F0',
            adjustMode: 'shrink-to-fit',
            weight: 'bold',
          },
        ],
        backgroundColor: '#84dcfd',
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'image',
            url: girlInfo.image,
            aspectMode: 'cover',
            aspectRatio: '4:6',
          },
          {
            type: 'text',
            text: girlInfo.girlName,
            adjustMode: 'shrink-to-fit',
            size: 'md',
            align: 'center',
            color: '#3db3ec',
          },
          {
            type: 'separator',
            color: '#ecfe42',
          },
          {
            type: 'text',
            text: girlInfo.threeSize,
            align: 'center',
            adjustMode: 'shrink-to-fit',
          },
          {
            type: 'separator',
            color: '#ecfe42',
          },
          {
            type: 'text',
            text: girlInfo.catchCopy,
            align: 'center',
            adjustMode: 'shrink-to-fit',
          },
        ],
        borderWidth: 'medium',
        borderColor: '#84dcfd',
        paddingAll: 'xs',
        action: {
          type: 'uri',
          label: 'action',
          uri:
            'https://www.elegaku.com/profile/top/castCode/' +
            girlInfo.girlId +
            '/',
        },
      },
    ],
    paddingEnd: 'xs',
    flex: 1,
  };
};
