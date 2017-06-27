import update from 'immutability-helper';

import {getActiveTags, getSelectedTagId} from 'src/tag/selectors';

describe('getActiveTags', () => {
  it('returns tags that have one or more unfinished tasks', () => {
    let tag1 = {id: 1, unfinishedTasksCount: 0};
    let tag2 = {id: 2, unfinishedTasksCount: 1};
    let tagState = {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2], meta: {}};
    let state = {tag: tagState};

    expect(getActiveTags(state)).toEqual([tag2]);

    tag1 = {...tag1, unfinishedTasksCount: 5};
    tagState = update(tagState, {byId: {$merge: {1: tag1}}});
    state = {tag: tagState};

    expect(getActiveTags(state)).toEqual([tag1, tag2]);

    tag2 = {...tag2, unfinishedTasksCount: 0};
    tagState = update(tagState, {byId: {$merge: {2: tag2}}});
    state = {tag: tagState};

    expect(getActiveTags(state)).toEqual([tag1]);
  });
});

describe('getSelectedTagId', () => {
  it('returns undefined when no tag is selected', () => {
    const state = {tag: {meta: {}}};

    expect(getSelectedTagId(state)).toBeUndefined();
  });

  it('returns the selected tag id', () => {
    const state = {tag: {meta: {selectedTagId: 'foo'}}};

    expect(getSelectedTagId(state)).toBe('foo');
  });
});
