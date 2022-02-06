import Component from '@glimmer/component';
import { action } from '@ember/object';
import { TASK_STATUSES } from 'website-my/constants/tasks';

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

  availableTaskStatuses = TASK_STATUSES;
}
