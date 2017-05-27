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
  it('returns an UPDATE action', () => {
    const payload = {some: 'payload'};

    expect(updateTag(payload)).toEqual({type: UPDATE, payload});
  });
});

describe('updateTagMeta', () => {
  it('returns an UPDATE_META action', () => {
    const payload = {some: 'payload'};

    expect(updateTagMeta(payload)).toEqual({type: UPDATE_META, payload});
  });
});
