jest.mock('react-dom');
import 'packs/application';

it('sets up the application', () => {
  expect(window.jQuery).not.toBeUndefined();
});
