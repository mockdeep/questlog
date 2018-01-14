jest.mock('src/_helpers/ajax');

import {ajaxPut} from 'src/_helpers/ajax';
import {
  SET, UPDATE, UPDATE_META, UPSERT,
  setTags, updateTag, updateTagMeta, upsertTagPlain, upsertTags,
} from 'src/tag/action_creators';

describe('setTags', () => {
  it('returns a SET action', () => {
    const payload = {some: 'payload'};

    expect(setTags(payload)).toEqual({type: SET, payload});
  });
});

describe('updateTag', () => {
  it('returns an update thunk', async () => {
    const payload = {some: 'payload'};
    const thunk = updateTag(5, payload);
    const dispatch = jest.fn();
    const expectedAction = {type: UPDATE, payload: {id: 5, ...payload}};

    await thunk(dispatch);

    expect(ajaxPut).toHaveBeenCalledWith('/api/v1/tags/5', {tag: payload});
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe('updateTagMeta', () => {
  it('returns an UPDATE_META action', () => {
    const payload = {some: 'payload'};

    expect(updateTagMeta(payload)).toEqual({type: UPDATE_META, payload});
  });
});

describe('upsertTagPlain', () => {
  it('returns an UPSERT action', () => {
    const payload = {some: 'payload'};

    expect(upsertTagPlain(payload)).toEqual({type: UPSERT, payload});
  });
});

describe('upsertTags', () => {
  it('returns an upsert thunk', () => {
    const tags = [{itsa: 'tag'}, {bea: 'chad'}];
    const dispatch = jest.fn();

    const thunk = upsertTags(tags);

    expect(thunk).toBeInstanceOf(Function);
    expect(thunk.name).toBe('upsertTagsThunk');

    thunk(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(upsertTagPlain({itsa: 'tag'}));
    expect(dispatch).toHaveBeenCalledWith(upsertTagPlain({bea: 'chad'}));
  });
});
