jest.mock('src/_helpers/ajax');

import {makeState, makeTag} from '_test_helpers/factories';

import {ajaxPut} from 'src/_helpers/ajax';
import {
  SET, UPDATE, UPDATE_META, UPSERT,
  setTags, updateTag, updateTagMeta, upsertTagPlain, upsertTags,
} from 'src/tag/action_creators';

describe('setTags', () => {
  it('returns a SET action', () => {
    const payload = [makeTag({})];

    expect(setTags(payload)).toEqual({type: SET, payload});
  });
});

describe('updateTag', () => {
  it('returns an update thunk', async () => {
    const payload: {rules: TagRule[]} = {rules: []};
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
    const payload: {rules: TagRule[]} = {rules: []};

    expect(updateTagMeta(payload)).toEqual({type: UPDATE_META, payload});
  });
});

describe('upsertTagPlain', () => {
  it('returns an UPSERT action', () => {
    const payload: {rules: TagRule[]} = {rules: []};

    expect(upsertTagPlain(payload)).toEqual({type: UPSERT, payload});
  });
});

describe('upsertTags', () => {
  it('returns an upsert thunk', () => {
    const tag: {rules: TagRule[]} = {rules: []};
    const payload = [tag];
    const dispatch = jest.fn();

    const thunk = upsertTags(payload);

    expect(thunk).toBeInstanceOf(Function);
    expect(thunk.name).toBe('upsertTagsThunk');

    thunk(dispatch, () => makeState({}), null);

    expect(dispatch).toHaveBeenCalledWith(upsertTagPlain(tag));
  });
});
