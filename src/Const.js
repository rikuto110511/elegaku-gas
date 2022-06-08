/** スプレッドシート関連 **/
/** スプレッドシート参照時に使用するID **/
var SPREAD_SHEET_ID = 'XXXXXXXXXXXXXXXXXXX';
/** シート名：LINEユーザー情報を保持するシート **/
var SPREAD_SHEET_NAME_USERS = 'users';
/** シート名：LINEユーザー毎に通知対象の女の子を保持するシート **/
var SPREAD_SHEET_NAME_FAVORITE_GIRLS = 'favorite_girls';
/** シート名：在籍している女の子の情報を保持するシート **/
var SPREAD_SHEET_NAME_GIRLS = 'girls';
/** シート名：出勤情報を保持するシート **/
var SPREAD_SHEET_NAME_SCHEDULE = 'schedule';
/** シート名：ランキングを保持するシート **/
var SPREAD_SHEET_NAME_RANK = 'rank';
/** シート名：新入生を保持するシート **/
var SPREAD_SHEET_NAME_NEW_FACE = 'new_face';
/** シート名：動画を保持するシート **/
var SPREAD_SHEET_NAME_MOVIE = 'movie';

/** MessagingAPI 関連 **/
/** MessagingAPIのアクセストークン **/
var MSG_API_CHANNEL_ACCESS_TOKEN = 'XXXXXXXXXXXXXXXXXXX';
/** イベントタイプ：フォロー（追加） **/
var MSG_API_EVENT_FOLLOW = 'follow';
/** イベントタイプ：フォロー解除 **/
var MSG_API_EVENT_UNFOLLOW = 'unfollow';
/** イベントタイプ：メッセージ **/
var MSG_API_EVENT_MESSAGE = 'message';
/** イベントタイプ：ポストバック **/
var MSG_API_EVENT_POSTBACK = 'postback';
/** リプライ時のURL **/
var MSG_API_URL_REPLY = 'https://api.line.me/v2/bot/message/reply';
/** プロフィール情報参照時のURL **/
var MSG_API_URL_PROFILE = 'https://api.line.me/v2/bot/profile/';
/** プッシュ通知時のURL */
var MSG_API_URL_PUSH = 'https://api.line.me/v2/bot/message/push';
/** プッシュ通知時のURL(一斉送信) */
var MSG_API_URL_MULTICAST = 'https://api.line.me/v2/bot/message/multicast';
/** ポストバック：register **/
var MSG_POSTBACK_REGISTER = 'register';
/** ポストバック：register：add **/
var MSG_POSTBACK_ADD = 'add';
/** ポストバック：register：remove **/
var MSG_POSTBACK_REMOVE = 'remove';
/** ポストバック：schedule **/
var MSG_POSTBACK_SCHEDULE = 'schedule';
/** ポストバック：schedule:date **/
var MSG_POSTBACK_DATE = 'date';
/** ポストバック：ranking **/
var MSG_POSTBACK_RANKING = 'ranking';
/** ポストバック：location **/
var MSG_POSTBACK_LOCATION = 'location';
/** ポストバック：system **/
var MSG_POSTBACK_SYSTEM = 'system';
/** ポストバック：newface **/
var MSG_POSTBACK_NEW_FACE = 'newface';
/** ポストバック：video **/
var MSG_POSTBACK_VIDEO = 'video';
/** ポストバック：video **/
var MSG_POSTBACK_VIDEO_URL = 'url';
/** ポストバック：menu_switch **/
var MSG_POSTBACK_MENU_SWITCH = 'menu_switch';

/** スクレイピング関連 **/
/** エレガンス学院：ルートURL */
var ELEGAKU_URL_BASE = 'https://www.elegaku.com/';
/** エレガンス学院：生徒一覧 **/
var ELEGAKU_URL_CAST = ELEGAKU_URL_BASE + 'cast/';
/** エレガンス学院：出勤情報（動的に設定⇒「y/2022/MM/01/dd/29」） **/
var ELEGAKU_URL_SCHEDULE = ELEGAKU_URL_BASE + 'cast/schedule/';
/** エレガンス学院：ランキング **/
var ELEGAKU_URL_RANKING = ELEGAKU_URL_BASE + 'rank/';
/** エレガンス学院：新入生紹介 **/
var ELEGAKU_URL_NEW_FACE = ELEGAKU_URL_BASE + 'newface/';
/** エレガンス学院：動画一覧 **/
var ELEGAKU_URL_MOVIE = ELEGAKU_URL_BASE + 'movie/';

/** その他 **/
var PARALLEL_NO_MAX = 6;
