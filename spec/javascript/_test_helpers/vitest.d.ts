import type {
  Assertion,
  AsymmetricMatchersContaining,
  ExpectStatic,
  vi as Vi,
} from 'vitest';

interface EnzymeMatchers<R = unknown> {
  toExist(): R;
  toHaveProp(key: string, value?: unknown): R;
  toHaveClassName(className: string): R;
  toHaveState(expected: Record<string, unknown>): R;
  toHaveText(text: string): R;
  toIncludeText(text: string): R;
  toBeDisabled(): R;
}

declare module 'vitest' {
  interface Assertion<T> extends EnzymeMatchers<T> {}
  interface AsymmetricMatchersContaining extends EnzymeMatchers {}
}

declare global {
  const vi: typeof Vi;
  const expect: ExpectStatic;
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void): void;
  function it(name: string, fn: () => Promise<void>): void;
  function beforeEach(fn: () => void): void;
  function afterEach(fn: () => void): void;
  function beforeAll(fn: () => void): void;
  function afterAll(fn: () => void): void;
}
