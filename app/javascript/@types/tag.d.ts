type Check = 'isActive' | 'isAssociated' | 'isBlank' | 'isEmpty';

type TagRule = {
  field?: keyof Task;
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
