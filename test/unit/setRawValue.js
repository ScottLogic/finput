import finput from '../../dist/finput';

describe('setRawValue', () => {

    let element;
    let api;

    beforeEach(() => {
        element = document.createElement('input');
        api = finput(element);
    });

    afterEach(() => {
        api.destroy();
    });

    it('when passed 0 sets value 0', () => {
        api.setRawValue(0);
        expect(element.value).toBe('0.00');
    });

    it('has an initial value of empty string and rawValue of undefined', () => {
        expect(element.value).toBe('');
        expect(api.rawValue).toBe(undefined);
    });

    it('resets back to empty string and undefined when entry is deleted', () => {
        api.setRawValue(100);
        api.setRawValue('');

        expect(element.value).toBe('');
        expect(api.rawValue).toBe(undefined);
    });

});
