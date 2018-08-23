export default class ValueHistory {
    public history: string[] = [];
    public currentIndex: number = 0;

    get currentValue() {
        return this.history[this.currentIndex];
    }

    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        return this.currentValue;
    }

    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
        }
        return this.currentValue;
    }

    addValue(val) {
        // Delete everything AFTER current value
        if (val !== this.currentValue) {
            this.history.splice(this.currentIndex + 1, null, val);

            if (this.history.length > 50) {
                this.history.shift();
            }
        }

        this.currentIndex = this.history.length - 1;

        return this.currentValue;
    }
}