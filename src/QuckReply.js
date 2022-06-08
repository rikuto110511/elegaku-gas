/** 出勤情報確認用に直近１週間の日付を配列で返却 **/
const createQuckReplySchedule = () => {
  let results = [];
  WEEK_PLUS.forEach((n) => {
    let date = new Date();
    date.setDate(date.getDate() + n);

    let label;
    switch (n) {
      case 0:
        label = '本日';
        break;
      case 1:
        label = '明日';
        break;
      default:
        label = formatDate(date, FORMAT_MD) + '(' + getDayOfWeek(date) + ')';
        break;
    }

    const data = formatDate(date, FORMAT_YMD);

    results.push({
      type: 'action',
      action: {
        type: 'postback',
        label: label,
        data: 'schedule:date=' + data,
        text: label + 'の出勤情報を確認！',
      },
    });
  });
  return results;
};
