export default class ValueHistory {
    public history: string[] = [];
    public currentIndex: number = 0;

    get currentValue(): string {
        return this.history[this.currentIndex];
    }

    undo(): string {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        return this.currentValue;
    }

    redo(): string {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
        }
        return this.currentValue;
    }

    addValue(val: string): string {
        // Delete everything AFTER current value
        if (val !== this.currentValue) {
            this.history = [...this.history.slice(0, this.currentIndex), val];

            if (this.history.length > 50) {
                this.history.shift();
            }
        }

        this.currentIndex = this.history.length - 1;

        return this.currentValue;
    }
}