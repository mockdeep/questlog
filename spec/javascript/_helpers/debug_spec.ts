/* eslint-disable no-console */
import debug from 'src/_helpers/debug';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { /* nada */ });
});
describe('when run from node', () => {
  it('prints helpful debug output without a label', () => {
    const myObject = {myKey: 'myValue'};

    debug(myObject);

    const expectedLabel = '\x1b[45m\x1b[1m  DEBUG  \x1b[0m \x1b[1m==>\x1b[0m ';

    expect(console.log).toHaveBeenCalledWith(expectedLabel, myObject);
  });

  it('prints helpful debug output with a label', () => {
    const myObject = {myKey: 'myValue'};

    debug('my debug message', myObject);

    const expectedLabel = '\x1b[45m\x1b[1m  DEBUG  \x1b[0m ' +
      '(\x1b[94mmy debug message\x1b[0m) \x1b[1m==>\x1b[0m ';

    expect(console.log).toHaveBeenCalledWith(expectedLabel, myObject);
  });
});

describe('when in the browser', () => {
  beforeEach(() => {
    (process as any).browser = true;
  });

  afterEach(() => {
    delete (process as any).browser;
  });

  it('prints helpful debug output without a label', () => {
    const myObject = {myKey: 'myValue'};

    debug(myObject);

    const expectedLabel = '%c  DEBUG  %c %c==>%c';
    const expectedStyles = [
      'background-color: magenta; color: white',
      '',
      'font-weight: bold',
      '',
    ];

    const expectedArgs = [expectedLabel, ...expectedStyles, myObject];

    expect(console.log).toHaveBeenCalledWith(...expectedArgs);
  });

  it('prints helpful debug output with a label', () => {
    const myObject = {myKey: 'myValue'};

    debug('my debug message', myObject);

    const expectedLabel = '%c  DEBUG  %c (%cmy debug message%c) %c==>%c';
    const expectedStyles = [
      'background-color: magenta; color: white',
      '',
      'color: blue',
      '',
      'font-weight: bold',
      '',
    ];
    const expectedArgs = [expectedLabel, ...expectedStyles, myObject];

    expect(console.log).toHaveBeenCalledWith(...expectedArgs);
  });
});
