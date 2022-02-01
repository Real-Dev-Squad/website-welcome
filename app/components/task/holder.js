import Component from '@glimmer/component';
import { action } from '@ember/object';
import { STATUS, TASK_STATUSES } from 'website-my/constants/tasks';

const { ACTIVE, BLOCKED, COMPLETED, PENDING } = STATUS;

export default class TasksHolderComponent extends Component {
  @action
  onPercentageChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('percentCompleted', value);
  }

  @action
  onStatusChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('status', value);
  }

  @action handleTaskStatusChange(e) {
    console.log(e.target.value);
  }

  taskStatus = TASK_STATUSES;

  availableStatusOptions = [ACTIVE, BLOCKED, COMPLETED, PENDING];
}
