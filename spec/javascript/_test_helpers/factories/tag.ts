import {nextId} from '_test_helpers/factories/id';

function makeTag(attrs: Partial<Tag>): Tag {
  const nextTagId = nextId();

  return {
    id: nextTagId,
    name: `Tag ${nextTagId}`,
    slug: `tag-${nextTagId}`,
    priority: null,
    rules: [],
    tasks: [],
    ...attrs,
  };
}

function makeTagState({tags = []}: {tags?: Tag[]}): TagState {
  const byId: TagsById = tags.reduce((result: TagsById, tag) => {
    result[tag.id] = tag;
    return result;
  }, {});

  return {byId};
}

export {makeTag, makeTagState};
