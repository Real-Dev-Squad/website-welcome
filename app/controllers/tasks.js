import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksController extends Controller {
  @tracked showDropDown = false;
  @tracked showActiveTasks = true;
  @tracked showPendingTasks = false;
  @tracked showBlockedTasks = false;
  @tracked showCompletedTasks = false;
  @tracked activeTasksList = this.model.activeTasks;

  @tracked completedTasksList = [];
  @tracked fields = [];
  @tracked collection = null;

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
    (async () => {
      const response = await fetch(
        `${API_BASE_URL}/tasks/self?completed=true`,
        { credentials: 'include' }
      );
      this.completedTasksList = await response.json();
      console.log(this.completedTasksList);
    })();
  }

  @action handleInputChange(e) {
    this.fields[e.target.id] = e.target.value;
  }

  @action async handleUpdateTask(taskid) {
    const taskData = {
      percentCompleted: this.fields['percentCompleted'],
      status: this.fields['status'],
    };
    if (taskData.status || taskData.percentCompleted) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskid}`, {
          method: 'PATCH',
          body: JSON.stringify(taskData),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const { status } = response;

        if (status === 204) {
          this.activeTasksList.forEach((task) => {
            if (task.id === taskid) {
              if (taskData.status && taskData.status != task.status) {
                set(task, 'status', taskData.status);
              }
              if (
                taskData.percentCompleted &&
                taskData.percentCompleted != task.percentCompleted
              ) {
                set(task, 'percentCompleted', taskData.percentCompleted);
              }
            }
          });
        }
      } catch (err) {
        console.error('Error : ', err);
      }
    }
  }
}
