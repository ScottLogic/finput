
module.exports = {

  editString: function(str, toAdd, caretStart, caretEnd = caretStart) {
    const firstHalf = str.slice(0, caretStart);
    const secondHalf = str.slice(caretEnd, str.length);
    return `${firstHalf}${toAdd}${secondHalf}`;
  }
}
