type TimeframeName = 'inbox'
  | 'today'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'lustrum'
  | 'decade';

type TimeframeSpace = {
  [timeframeName: string]: number;
};
