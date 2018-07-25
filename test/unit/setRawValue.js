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

});
