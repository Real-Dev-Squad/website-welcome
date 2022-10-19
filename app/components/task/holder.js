import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { tracked } from '@glimmer/tracking';
import { TASK_PERCENTAGE } from '../../constants/tasks';

export default class TasksHolderComponent extends Component {
  @tracked percentCompleted = this.args.task.percentCompleted;
  TASK_KEYS = TASK_KEYS;
  availabletaskStatusList = TASK_STATUS_LIST;
  @action
  onPercentageChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('percentCompleted', value);
    if (value === TASK_PERCENTAGE.completedPercentage) {
      this.percentCompleted = this.args.task.percentCompleted;
    }
  }

  @action
  onStatusChange(e) {
    const { value } = e.target;
    this.args.onTaskChange('status', value);
  }
}
