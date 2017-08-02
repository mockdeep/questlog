jest.mock('src/_helpers/ajax');

import {ajaxPut} from 'src/_helpers/ajax';
import {
  SET, UPDATE, UPDATE_META,
  setTags, updateTag, updateTagMeta,
} from 'src/tag/action_creators';

describe('setTags', () => {
  it('returns a SET action', () => {
    const payload = {some: 'payload'};

    expect(setTags(payload)).toEqual({type: SET, payload});
  });
});

describe('updateTag', () => {
  it('returns an update thunk', () => {
    const payload = {some: 'payload'};
    const thunk = updateTag(5, payload);
    const dispatch = jest.fn();
    const then = jest.fn();

    ajaxPut.mockImplementation(() => ({then}));

    thunk(dispatch);

    expect(ajaxPut).toHaveBeenCalledWith('/api/v1/tags/5', {tag: payload});
    then.mock.calls[0][0]();
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE, payload: {id: 5, ...payload}});
  });
});

describe('updateTagMeta', () => {
  it('returns an UPDATE_META action', () => {
    const payload = {some: 'payload'};

    expect(updateTagMeta(payload)).toEqual({type: UPDATE_META, payload});
  });
});
