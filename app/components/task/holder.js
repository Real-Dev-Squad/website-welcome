import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TASK_STATUS_LIST } from 'website-my/constants/tasks';

export default class TasksHolderComponent extends Component {
  availabletaskStatusList = TASK_STATUS_LIST;
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
}
