const WEEK_PLUS = [0, 1, 2, 3, 4, 5, 6];
const WEEK_MINUS = [-1, -2, -3, -4, -5, -6];
const FORMAT_YMD = 'yyyy-MM-dd';
const FORMAT_MD = 'MM/dd';

/** 曜日を取得する。 */
const getDayOfWeek = (date) => {
  return ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
};

/** フォーマット（） **/
const formatDate = (date, format) => {
  return Utilities.formatDate(date, 'Asia/Tokyo', format);
};
