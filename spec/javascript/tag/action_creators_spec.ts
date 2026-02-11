vi.mock('helpers/ajax');

import {makeState, makeTag} from '_test_helpers/factories';
import {
  SET, UPSERT,
  setTags, upsertTagPlain, upsertTags,
} from 'src/tag/action_creators';

describe('setTags', () => {
  it('returns a SET action', () => {
    const payload = [makeTag()];

    expect(setTags(payload)).toEqual({type: SET, payload});
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
    const dispatch = vi.fn();

    const thunk = upsertTags(payload);

    expect(thunk).toBeInstanceOf(Function);
    expect(thunk.name).toBe('upsertTagsThunk');

    thunk(dispatch, () => makeState(), null);

    expect(dispatch).toHaveBeenCalledWith(upsertTagPlain(tag));
  });
});
