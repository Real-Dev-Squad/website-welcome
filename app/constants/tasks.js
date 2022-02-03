const STATUS = {
  ACTIVE: 'active',
  BLOCKED: 'blocked',
  COMPLETED: 'completed',
  PENDING: 'pending',
  IN_PROGRESS: 'IN_PROGRESS',
};

const TASK_STATUSES = [
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

export { STATUS, TASK_STATUSES };
