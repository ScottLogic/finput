import finput from '../../src/finput';

describe('setRawValue', () => {

    let element;
    let destroy;

    beforeEach(() => {
        element = document.createElement('input');
        destroy = finput(element);
    });

    afterEach(() => {
        destroy();
    });

    it('when passed 0 sets value 0', () => {
        element.setRawValue(0);
        expect(element.value).toBe('0.00');
    });

    it('has an initial value of empty string and rawValue of undefined', () => {
        expect(element.value).toBe('');
        expect(element.rawValue).toBe(undefined);
    });

    it('sets value to empty string and rawValue to 0 when entry is deleted', () => {
        element.setRawValue(100);
        element.setRawValue('');

        expect(element.value).toBe('');
        expect(element.rawValue).toBe(0);
    });

});
