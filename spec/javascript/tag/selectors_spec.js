import {getActiveTags, getSelectedTags} from 'src/tag/selectors';

describe('getActiveTags', () => {
  it('returns tags that have one or more unfinished tasks', () => {
    let tag1 = {id: 1, unfinishedTasksCount: 0};
    let tag2 = {id: 2, unfinishedTasksCount: 1};
    let state = {tag: {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]}};

    expect(getActiveTags(state)).toEqual([tag2]);

    tag1 = {...tag1, unfinishedTasksCount: 5};
    state = {tag: {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]}};

    expect(getActiveTags(state)).toEqual([tag1, tag2]);

    tag2 = {...tag2, unfinishedTasksCount: 0};
    state = {tag: {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]}};

    expect(getActiveTags(state)).toEqual([tag1]);
  });
});

describe('getSelectedTags', () => {
  it('returns tags that are marked as selected', () => {
    let tag1 = {id: 1};
    let tag2 = {id: 2, isSelected: true};
    let state = {tag: {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]}};

    expect(getSelectedTags(state)).toEqual([tag2]);

    tag1 = {...tag1, isSelected: true};
    state = {tag: {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]}};

    expect(getSelectedTags(state)).toEqual([tag1, tag2]);

    tag2 = {...tag2, isSelected: false};
    state = {tag: {byId: {1: tag1, 2: tag2}, orderedIds: [1, 2]}};

    expect(getSelectedTags(state)).toEqual([tag1]);
  });
});
