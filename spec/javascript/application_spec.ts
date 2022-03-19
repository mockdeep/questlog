jest.mock('react-dom');

import 'src/application';
import debug from 'src/_helpers/debug';

it('sets debug as a global', () => {
  expect(window.debug).toBe(debug);
});
