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
  @tracked activeTasksList = this.model.activeTasks;
  @tracked blockedTasksList = this.model.blockedTasks;
  @tracked pendingTasksList = this.model.pendingTasks;
  @tracked allTasksList = this.model.tasks;

  @tracked fieldsToBeUpdated = {};
  @tracked collection = null;

  @action toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  @action toggleActiveTasks() {
    this.showActiveTasks = true;
    this.showBlockedTasks = false;
    this.showPendingTasks = false;
  }

  @action togglePendingTasks() {
    this.showActiveTasks = false;
    this.showBlockedTasks = false;
    this.showPendingTasks = true;
  }

  @action toggleBlockedTasks() {
    this.showActiveTasks = false;
    this.showBlockedTasks = true;
    this.showPendingTasks = false;
  }

  @action onTaskChange(key, value) {
    this.fieldsToBeUpdated[key] = value;
  }

  @action async handleUpdateTask(e) {
    const taskId = e.target.id;
    const taskData = this.fieldsToBeUpdated;
    if (taskData.status || taskData.percentCompleted) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          method: 'PATCH',
          body: JSON.stringify(taskData),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const { status } = response;

        if (status === 204) {
          const indexOfSelectedTask = this.allTasksList.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasksList[indexOfSelectedTask];

          if (taskData.status && taskData.status != selectedTask.status)
            set(selectedTask, 'status', taskData.status);
          if (
            taskData.percentCompleted &&
            taskData.percentCompleted != selectedTask.percentCompleted
          )
            set(selectedTask, 'percentCompleted', taskData.percentCompleted);

          this.activeTasksList.setObjects(
            this.allTasksList.filterBy('status', 'active')
          );
          this.pendingTasksList.setObjects(
            this.allTasksList.filterBy('status', 'pending')
          );
          this.blockedTasksList.setObjects(
            this.allTasksList.filterBy('status', 'blocked')
          );
        }
      } catch (err) {
        console.error('Error : ', err);
      }
    }
  }
}
