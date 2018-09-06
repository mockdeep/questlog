jest.mock('react-dom');
jest.mock('src/app_base', () => { /* do nothing */ });

import 'src/application';
import debug from 'src/_helpers/debug';

it('sets debug as a global', () => {
  expect(window.debug).toBe(debug);
});
