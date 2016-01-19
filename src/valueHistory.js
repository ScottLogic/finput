
const MAX_BUFFER_SIZE = 50;

/**
 * Value History - Manages an array of values that can be tracked, supporting
 * the undo and redo operations in the input
 */
export default class ValueHistory {

  constructor() {
    this._history = [null];
    this._currentIndex = 0;
  }

  // GETTERS
  get history() {
    return this._history;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  get currentValue() {
    return this.history[this.currentIndex];
  }

  set currentIndex(i) {
    this._currentIndex = i;
  }
  set history(history) {
    this._history = history;
  }

  /**
   * Undo change, so return to previous value in history array
   */
  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    return this.currentValue;
  }
  /**
   * Redo change, so return to next value in history array
   */
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
    }
    return this.currentValue;
  }
  /**
   * Add new value to history array. Any possible 'redo's' are removed from array
   * as a new 'branch' of history is created when a new value is added
   * @param {val} Value to add to history
   */
  addValue(val) {
    // Delete everything AFTER current value
    if (val !== this.currentValue) {
      this.history.splice(this.currentIndex + 1, null, val);

      if (this.history.length > MAX_BUFFER_SIZE) {
        this.history.shift();
      }
    }

    this.currentIndex = this.history.length - 1;

    return this.currentValue;
  }
}
