function StringBuffer() {
    this.__strings__ = [];
  };
  StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
    return this;
  };
  StringBuffer.prototype.appendFormat = function (str) {
    for (var i = 1; i < arguments.length; i++) {
      var parent = "\\{" + (i - 1) + "\\}";
      var reg = new RegExp(parent, "g")
      str = str.replace(reg, arguments[i]);
    }
    this.__strings__.push(str);
    return this;
  }
  StringBuffer.prototype.toString = function () {
    return this.__strings__.join('');
  };
  StringBuffer.prototype.clear = function () {
    this.__strings__ = [];
  }
  StringBuffer.prototype.size = function () {
    return this.__strings__.length;
  }
  //引入diff库
import * as Diff from "diff"
//   const Diff = require("diff");
  export const getHighLightDiff = (oldStr, str) => {
    const diff = Diff.diffChars(oldStr, str);
    //console.log(diff)
    var result = new StringBuffer();
    diff.forEach((part) => {
      if (part.added) {//文字新增，红色
        result.append("<span style='color:red'>");
        result.append(part.value);
        result.append("</span>");
      } else if (part.removed) {//文字删减，灰色删除线
        result.append("<del style='color:gray'>");
        result.append(part.value);
        result.append("</del>");
      } else {
        result.append(part.value);
      }
    });
    return result;
  }
  