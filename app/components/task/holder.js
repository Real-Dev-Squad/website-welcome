import Component from '@glimmer/component';
import { action } from '@ember/object';
import TASK_STATUS from 'website-my/constants/tasks';

const { ACTIVE, BLOCKED, COMPLETED, PENDING } = TASK_STATUS;

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

  availableStatusOptions = [ACTIVE, BLOCKED, COMPLETED, PENDING];
}
