const TASK_STATUS_LIST = [
  {
    label: 'All', // this particular object's order does matter, please check controllers/tasks
    key: 'all',
  },
  {
    label: 'Available',
    key: 'AVAILABLE',
  },
  {
    label: 'Assigned',
    key: 'ASSIGNED',
  },
  {
    label: 'In Progress',
    key: 'IN_PROGRESS',
  },
  {
    label: 'Blocked',
    key: 'BLOCKED',
  },
  {
    label: 'Smoke Testing',
    key: 'SMOKE_TESING',
  },
  {
    label: 'Completed',
    key: 'COMPLETED',
  },
  {
    label: 'Needs Review',
    key: 'NEEDS_REVIEW',
  },
  {
    label: 'In Review',
    key: 'IN_REVIEW',
  },
  {
    label: 'Approved',
    key: 'APPROVED',
  },
  {
    label: 'Merged',
    key: 'MERGED',
  },
  {
    label: 'Sanity Check',
    key: 'SANITY_CHECK',
  },
  {
    label: 'Regression Check',
    key: 'REGRESSION_CHECK',
  },
  {
    label: 'Released',
    key: 'RELEASED',
  },
  {
    label: 'Verified',
    key: 'VERIFIED',
  },
];

export { TASK_STATUS_LIST };
