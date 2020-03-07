type TagRule = {
  field?: string;
  check: string;
};

type Tag = {
  id: number;
  name: string;
  priority: number | null;
  slug: string;
  rules: TagRule[];
  tasks: Task[];
};

type TagMeta = {
  bad: string;
};

type AjaxTag = {
  rules: TagRule[];
};
