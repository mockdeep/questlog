import stopPropagation from 'src/_helpers/stop_propagation';

it('calls stopPropagation on the passed event', () => {
  const event = {stopPropagation: jest.fn()};

  stopPropagation(event);

  expect(event.stopPropagation).toHaveBeenCalled();
});
