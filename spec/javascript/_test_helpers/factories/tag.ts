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

export {makeTag};
