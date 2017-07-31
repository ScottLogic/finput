import {load, finputReversedDelimiters, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

describe('cutting', () => {
  beforeAll(load);

  describe('default delimiters', () => {
    const {cutting} = customCommandsFactory(finputDefaultDelimiters);

    // Cutting from input (should fully format unless no characters selected)
    // None selected
    cutting(0).characters().from(`123456`).startingFrom(0).shouldShow(`123,456`);
    cutting(2).characters().from(`12`).startingFrom(2).shouldShow(`12`);

    cutting(4).characters().from(`123456`).startingFrom(1).shouldShow(`156.00`);
    cutting(5).characters().from(`1234`).startingFrom(0).shouldShow(``);
  });

  describe('reversed delimiters', () => {
    const {cutting} = customCommandsFactory(finputReversedDelimiters);

    // Cutting from input (should fully format unless no characters selected)
    // None selected
    cutting(0).characters().from(`123456`).startingFrom(0).shouldShow(`123.456`);
    cutting(2).characters().from(`12`).startingFrom(2).shouldShow(`12`);

    cutting(4).characters().from(`123456`).startingFrom(1).shouldShow(`156,00`);
    cutting(5).characters().from(`1234`).startingFrom(0).shouldShow(``);
  });
});