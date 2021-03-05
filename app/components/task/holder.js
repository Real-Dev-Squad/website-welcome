import Component from '@glimmer/component';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';

const { ACTIVE, BLOCKED, COMPLETED, PENDING } = ENV.TASK_STATUS;

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

  availablePercentOptions = [20, 40, 60, 80];

  availableStatusOptions = [ACTIVE, BLOCKED, COMPLETED, PENDING];
}
