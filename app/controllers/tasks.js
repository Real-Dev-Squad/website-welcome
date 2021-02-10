import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const BASE_URL = 'https://staging-api.realdevsquad.com';

export default class TasksController extends Controller {
  @tracked showDropDown = false;
  @tracked showActiveTasks = true;
  @tracked showPendingTasks = false;
  @tracked showBlockedTasks = false;
  @tracked showCompletedTasks = false;

  @tracked completedTasksList = [];
  @tracked fields = [];

  @action toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  @action toggleActiveTasks() {
    this.showActiveTasks = true;
    this.showBlockedTasks = false;
    this.showCompletedTasks = false;
    this.showPendingTasks = false;
  }

  @action togglePendingTasks() {
    this.showActiveTasks = false;
    this.showBlockedTasks = false;
    this.showCompletedTasks = false;
    this.showPendingTasks = true;
  }

  @action toggleBlockedTasks() {
    this.showActiveTasks = false;
    this.showBlockedTasks = true;
    this.showCompletedTasks = false;
    this.showPendingTasks = false;
  }

  @action toggleCompletedTasks() {
    this.showActiveTasks = false;
    this.showBlockedTasks = false;
    this.showCompletedTasks = true;
    this.showPendingTasks = false;
  }

  @action handleInputChange(e) {
    this.fields[e.target.id] = e.target.value;
  }

  @action async handleUpdateTask(taskid) {
    const taskData = {
      percentCompleted: this.fields['percentCompleted'],
      status: this.fields['status'],
    };

    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskid}`, {
        method: 'PATCH',
        body: JSON.stringify(taskData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const { status } = response;

      if (status === 204) {
        console.log('Task Updated !');
        location.reload();
      }
    } catch (err) {
      console.error('Error : ', err);
    }
  }
}
