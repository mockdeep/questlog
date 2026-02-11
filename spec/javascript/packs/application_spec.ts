vi.mock('react-dom');
vi.mock('controllers/index');
vi.mock('@hotwired/turbo-rails');
import 'packs/application';

it('sets up the application', () => {
  expect(window.jQuery).not.toBeUndefined();
});
