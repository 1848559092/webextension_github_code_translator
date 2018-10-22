
// 假设每个字段除了词, 其他都是非英文字符.
// 仅翻译无空格的片段
function 取字段中所有词(字段文本) {
  // 删去所有前后空格后再提取单词
  var 删除前后空格 = 字段文本.trim();
  // 确认无空格
  if (!删除前后空格.match(/^[^\s]+$/g)) {
    return [];
  }
  var 单词 = 删除前后空格.match(/[a-zA-Z]+/g);
  if (单词) {
    var 分词 = [];
    for (某单词 of 单词) {
      分词 = 分词.concat(拆分骆驼命名(某单词))
    }
    return 分词;
  }
  return [];
}

function 取字段中最长句(字段) {
  var 句 = 字段.match(/[a-zA-Z\s]+/g);
  if (句 && 句.length > 0) {
    return 句[0].trim();
  }
  return 字段;
}

function 拆分骆驼命名(命名) {
  // 参考: https://stackoverflow.com/a/46409373/1536803
  // Firefox仍不支持lookbehinds: https://stackoverflow.com/questions/49816707/firefox-invalid-regex-group
  // 不知为何结果中有空字符串, 暂时过滤即可
  return 命名.split(/([A-Z]+|[A-Z]?[a-z]+)(?=[A-Z]|\b)/).filter(词 => 词);
}

function 消除所有括号内容(中文释义) {
   // 不确定是否存在多个括号的情况: 清理后.replace(/ *（[^）]*） */g, ""); //
  let 清理后 = 消除括号内容(中文释义, "（", "）");
  清理后 = 清理后.replace(/ *\([^)]*\) */g, "");
  清理后 = 清理后.replace(/ *\[[^)]*\] */g, "");
  return 清理后.trim();
}

function 消除括号内容(中文释义, 开括号, 闭括号) {
  let 开括号位置 = 中文释义.indexOf(开括号);
  let 闭括号位置 = 中文释义.indexOf(闭括号);
  if (开括号位置 == -1 || 闭括号位置 == -1) {
    return 中文释义;
  }
  let 括号内容 = 中文释义.substring(开括号位置, 闭括号位置 + 1);
  return 中文释义.replace(括号内容, "");
}