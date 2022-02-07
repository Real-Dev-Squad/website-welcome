import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { TASK_STATUS_LIST } from 'website-my/constants/tasks';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksController extends Controller {
  taskStatusList = TASK_STATUS_LIST;
  allTasksObject = this.taskStatusList[0];
  DEFAULT_TASK_TYPE = this.allTasksObject;
  @tracked showDropDown = true;
  @tracked taskFields = {};
  @tracked allTasks = this.model;
  @tracked isLoading = false;
  @tracked userSelectedTask = this.DEFAULT_TASK_TYPE;

  @action toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  @tracked tasksByStatus = {};

  filterTasksByStatus() {
    if (this.userSelectedTask.key === this.allTasksObject.key) {
      this.tasksToShow = this.allTasks;
    } else {
      this.tasksToShow = this.allTasks.filter(
        (task) => task.status === this.userSelectedTask.key
      );
    }
  }

  cleanReqBody(object) {
    const taskCompletionPercentage = object.percentCompleted;
    if (taskCompletionPercentage) {
      object.percentCompleted = parseInt(taskCompletionPercentage);
    }
    return object;
  }

  @action changeUserSelectedTask(statusObject) {
    this.userSelectedTask = statusObject;
    this.filterTasksByStatus();
  }

  @tracked tasksToShow = this.allTasks;

  @action onTaskChange(key, value) {
    this.taskFields[key] = value;
  }

  @action async handleUpdateTask(taskId) {
    this.isLoading = true;
    const taskData = this.taskFields;
    const cleanBody = this.cleanReqBody(taskData);
    if (taskData.status || taskData.percentCompleted) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/self/${taskId}`, {
          method: 'PATCH',
          body: JSON.stringify(cleanBody),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          alert('Task updated successfully!');
          const indexOfSelectedTask = this.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasks[indexOfSelectedTask];
          const updatedTask = { ...selectedTask, ...cleanBody };
          this.allTasks[indexOfSelectedTask] = updatedTask;
          this.filterTasksByStatus();
        }
      } catch (err) {
        alert('Failed to update the task');
        console.error('Error : ', err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
