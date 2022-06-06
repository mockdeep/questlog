type Check = 'isActive' | 'isAssociated' | 'isBlank' | 'isEmpty';

type TagRuleField = 'estimateSeconds' | 'tagIds';

type TagRule = {
  field?: TagRuleField;
  check: Check;
};

type Tag = {
  id: number;
  name: string;
  priority: number | null;
  slug: string;
  rules: TagRule[];
  tasks: Task[];
};

type TagsById = {
  [tagId: number]: Tag;
}

type AjaxTag = {
  rules: TagRule[];
};
