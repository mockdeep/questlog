import {nextId} from "support/factories/id";

function makeTag(attrs: Partial<Tag> = {}): Tag {
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

// Mirrors TagRule::FIELDS, which the server sends to the rule editor.
function makeRuleFields(): TagRuleFieldOption[] {
  return [
    {
      name: "estimateSeconds",
      label: "Estimate Seconds",
      checks: [{name: "isBlank", label: "is blank"}],
    },
    {
      name: "tagIds",
      label: "Tags",
      checks: [{name: "isEmpty", label: "is empty"}],
    },
  ];
}

function makeTagState({tags = []}: {tags?: Tag[]} = {}): TagState {
  const byId: TagsById = tags.reduce((result: TagsById, tag) => {
    result[tag.id] = tag;
    return result;
  }, {});

  return {byId};
}

export {makeRuleFields, makeTag, makeTagState};
