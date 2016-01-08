
class Finput {

  constructor(element, options) {
    this._element = element;
    this._options = options;
  }

  get element() {
    return this._element;
  }
  get options() {
    return this._options;
  }
}

export default Finput;
