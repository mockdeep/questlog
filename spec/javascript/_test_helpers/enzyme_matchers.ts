import {expect} from "vitest";
import type {ShallowWrapper, ReactWrapper} from "enzyme";

type EnzymeWrapper = ShallowWrapper | ReactWrapper;

expect.extend({
  toExist(received: EnzymeWrapper) {
    const pass = received.exists();

    return {
      pass,
      message: () =>
        pass
          ? "expected wrapper not to exist"
          : "expected wrapper to exist",
    };
  },

  toHaveProp(received: EnzymeWrapper, key: string, value?: unknown) {
    const actual = received.prop(key);
    const pass = arguments.length === 3
      ? this.equals(actual, value)
      : actual !== undefined;

    return {
      pass,
      message: () =>
        pass
          ? `expected wrapper not to have prop "${key}"${arguments.length === 3 ? ` with value ${this.utils.printExpected(value)}` : ""}`
          : `expected wrapper to have prop "${key}"${arguments.length === 3 ? ` with value ${this.utils.printExpected(value)}, but received ${this.utils.printReceived(actual)}` : ""}`,
    };
  },

  toHaveClassName(received: EnzymeWrapper, className: string) {
    const pass = received.hasClass(className);

    return {
      pass,
      message: () =>
        pass
          ? `expected wrapper not to have class "${className}"`
          : `expected wrapper to have class "${className}"`,
    };
  },

  toHaveState(received: EnzymeWrapper, expected: Record<string, unknown>) {
    const state = (received as ShallowWrapper).state();
    const pass = this.equals(state, expect.objectContaining(expected));

    return {
      pass,
      message: () =>
        pass
          ? `expected state not to contain ${this.utils.printExpected(expected)}`
          : `expected state to contain ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(state)}`,
    };
  },

  toIncludeText(received: EnzymeWrapper, text: string) {
    const renderedText = received.text();
    const pass = renderedText.includes(text);

    return {
      pass,
      message: () =>
        pass
          ? `expected text not to include "${text}"`
          : `expected text to include "${text}", but got "${renderedText}"`,
    };
  },

  toHaveText(received: EnzymeWrapper, text: string) {
    const renderedText = received.text();
    const pass = renderedText === text;

    return {
      pass,
      message: () =>
        pass
          ? `expected text not to equal "${text}"`
          : `expected text to equal "${text}", but got "${renderedText}"`,
    };
  },

  toBeDisabled(received: EnzymeWrapper) {
    const pass = received.prop("disabled") === true;

    return {
      pass,
      message: () =>
        pass
          ? "expected wrapper not to be disabled"
          : "expected wrapper to be disabled",
    };
  },
});
