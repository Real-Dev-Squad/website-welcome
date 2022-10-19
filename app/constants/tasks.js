const TASK_KEYS = {
  ALL: 'ALL',
  AVAILABLE: 'AVAILABLE',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  SMOKE_TESTING: 'SMOKE_TESTING',
  COMPLETED: 'COMPLETED',
  NEEDS_REVIEW: 'NEEDS_REVIEW',
  IN_REVIEW: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  MERGED: 'MERGED',
  SANITY_CHECK: 'SANITY_CHECK',
  REGRESSION_CHECK: 'REGRESSION_CHECK',
  RELEASED: 'RELEASED',
  VERIFIED: 'VERIFIED',
};

const {
  ALL,
  AVAILABLE,
  ASSIGNED,
  IN_PROGRESS,
  BLOCKED,
  SMOKE_TESTING,
  COMPLETED,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
} = TASK_KEYS;

const TASK_STATUS_LIST = [
  {
    displayLabel: 'All',
    key: ALL,
  },
  {
    displayLabel: 'Available',
    key: AVAILABLE,
  },
  {
    displayLabel: 'Assigned',
    key: ASSIGNED,
  },
  {
    displayLabel: 'In Progress',
    key: IN_PROGRESS,
  },
  {
    displayLabel: 'Blocked',
    key: BLOCKED,
  },
  {
    displayLabel: 'Smoke Testing',
    key: SMOKE_TESTING,
  },
  {
    displayLabel: 'Completed',
    key: COMPLETED,
  },
  {
    displayLabel: 'Needs Review',
    key: NEEDS_REVIEW,
  },
  {
    displayLabel: 'In Review',
    key: IN_REVIEW,
  },
  {
    displayLabel: 'Approved',
    key: APPROVED,
  },
  {
    displayLabel: 'Merged',
    key: MERGED,
  },
  {
    displayLabel: 'Sanity Check',
    key: SANITY_CHECK,
  },
  {
    displayLabel: 'Regression Check',
    key: REGRESSION_CHECK,
  },
  {
    displayLabel: 'Released',
    key: RELEASED,
  },
  {
    displayLabel: 'Verified',
    key: VERIFIED,
  },
];

export const TASK_MESSAGES = {
  // this will be changed to 'This task will be marked as complete and a new task will be assigned to you.' when we have the middleware in our backend which will automatically assign a task to the user.
  markDone: 'This task will be marked as complete',
  // these two below will be added when we have the middleware in our backend

  // taskAssigned: 'The task was marked as completed and you are assigned a new task',
  // taskNotAssigned: "The task was assigned but there was no task available to be assigned"
};

export const TASK_PERCENTAGE = {
  completedPercentage: '100',
};

export { TASK_KEYS, TASK_STATUS_LIST };
