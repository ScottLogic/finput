import {load, finputReversedDelimiters, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

describe('copy and paste', () => {
  beforeAll(load);

  describe('default delimiters', () => {
    const {copyingAndPasting} = customCommandsFactory(finputDefaultDelimiters);

    copyingAndPasting(`aaaaa`).shouldShow(``);
    copyingAndPasting(`-12`).shouldShow(`-12.00`);
    copyingAndPasting(`-.9`).shouldShow(`-0.90`);
    copyingAndPasting(`7a7a.8a.`).shouldShow(`77.80`);
  });

  describe('reversed delimiters', () => {
    const {copyingAndPasting} = customCommandsFactory(finputReversedDelimiters);

    copyingAndPasting(`aaaaa`).shouldShow(``);
    copyingAndPasting(`-12`).shouldShow(`-12,00`);
    copyingAndPasting(`-,9`).shouldShow(`-0,90`);
    copyingAndPasting(`7a7a,8a,`).shouldShow(`77,80`);
  });
});