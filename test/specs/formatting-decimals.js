import {load, finputReversedDelimiters, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

describe('formatting decimals', () => {
  beforeAll(load);


  describe('default delimiters', () => {
    const {typing} = customCommandsFactory(finputDefaultDelimiters);

    describe('while focused', () => {
      typing(`0`).shouldShow(`0`);
      typing(`10`).shouldShow(`10`);
      typing(`1←0`).shouldShow(`1`);
      typing(`0.5←0`).shouldShow(`0.05`);
      typing(`0.5←0`).shouldShow(`0.05`);
      typing(`0.5←←0`).shouldShow(`0.5`);
      typing(`1.5←←0`).shouldShow(`10.5`);
      typing(`0.5←←7`).shouldShow(`7.5`);
      typing(`0.5←←←0`).shouldShow(`0.5`);
      typing(`.8`).shouldShow(`.8`);
      typing(`.8←0`).shouldShow(`.08`);
      typing(`.8←←0`).shouldShow(`0.8`);
      typing(`123456←←←←←.`).shouldShow(`12.34`);
      typing(`12.345`).shouldShow(`12.34`);
      typing(`12.34←←↚`).shouldShow(`1,234`);
      typing(`12.34←←↚`).shouldShow(`1,234`);
    });

    describe('on blur', () => {
      typing(`0.8`).thenFocusingOut().shouldShow(`0.80`);
      typing(`.8`).thenFocusingOut().shouldShow(`0.80`);
      typing(`8.88`).thenFocusingOut().shouldShow(`8.88`);
    });
  });

  describe('reversed delimiters', () => {
    const {typing} = customCommandsFactory(finputReversedDelimiters);

    describe('while focused', () => {
      typing(`0`).shouldShow(`0`);
      typing(`10`).shouldShow(`10`);
      typing(`1←0`).shouldShow(`1`);
      typing(`0,5←0`).shouldShow(`0,05`);
      typing(`0,5←0`).shouldShow(`0,05`);
      typing(`0,5←←0`).shouldShow(`0,5`);
      typing(`1,5←←0`).shouldShow(`10,5`);
      typing(`0,5←←7`).shouldShow(`7,5`);
      typing(`0,5←←←0`).shouldShow(`0,5`);
      typing(`,8`).shouldShow(`,8`);
      typing(`,8←0`).shouldShow(`,08`);
      typing(`,8←←0`).shouldShow(`0,8`);
      typing(`123456←←←←←,`).shouldShow(`12,34`);
      typing(`12,345`).shouldShow(`12,34`);
      typing(`12,34←←↚`).shouldShow(`1.234`);
      typing(`12,34←←↚`).shouldShow(`1.234`);
    });

    describe('on blur', () => {
      typing(`0,8`).thenFocusingOut().shouldShow(`0,80`);
      typing(`,8`).thenFocusingOut().shouldShow(`0,80`);
      typing(`8,88`).thenFocusingOut().shouldShow(`8,88`);
    })
  });

});
