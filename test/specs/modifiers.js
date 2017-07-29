import {load, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

const { typing }  = customCommandsFactory(finputDefaultDelimiters);

describe('modifiers', () => {
    beforeEach(async () => await load());

    describe('are not blocked from activating keyboard shortcuts', () => {
        typing('k').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('m').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('b').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('l').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('h').whileModifierPressed().shouldShow('').shouldHaveFocus(false);

        typing('0').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('1').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('2').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('3').whileModifierPressed().shouldShow('').shouldHaveFocus(false);

        typing('-').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('+').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing('.').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
        typing(',').whileModifierPressed().shouldShow('').shouldHaveFocus(false);
    });
});
