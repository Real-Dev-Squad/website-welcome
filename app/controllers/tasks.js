import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { TASK_MESSAGES } from '../constants/tasks';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksController extends Controller {
  TASK_KEYS = TASK_KEYS;
  taskStatusList = TASK_STATUS_LIST;
  allTasksObject = this.taskStatusList.find(
    (obj) => obj.key === this.TASK_KEYS.ALL
  );
  DEFAULT_TASK_TYPE = this.allTasksObject;
  @tracked showDropDown = true;
  @tracked taskFields = {};
  @tracked allTasks = this.model;
  @tracked isLoading = false;
  @tracked userSelectedTask = this.DEFAULT_TASK_TYPE;
  @tracked showModal = false;
  @tracked tempTaskId = ''; // this Id will be used to update task which are completed 100%
  @tracked message = ''; // this is required in the modal
  @tracked buttonRequired = false; // this is required in the modal
  @tracked disabled = false; // this is required for the holder component

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

  constructReqBody(object) {
    const requestBody = { status: object.status };
    const taskCompletionPercentage = object.percentCompleted;
    if (taskCompletionPercentage) {
      if (taskCompletionPercentage === '100') {
        requestBody.status = 'COMPLETED';
      }
      requestBody.percentCompleted = parseInt(taskCompletionPercentage);
    }
    return requestBody;
  }

  @action goBack() {
    this.showModal = false;
    this.onTaskChange('percentCompleted', '75');
  }

  @action markComplete() {
    this.updateTask(this.tempTaskId);
    this.showModal = false;
  }

  @action changeUserSelectedTask(statusObject) {
    this.userSelectedTask = statusObject;
    this.filterTasksByStatus();
  }

  @tracked tasksToShow = this.allTasks;

  @action onTaskChange(key, value) {
    this.taskFields[key] = value;
  }

  @action async updateTask(taskId) {
    this.disabled = true;
    const taskData = this.taskFields;
    this.isLoading = true;
    const cleanBody = this.constructReqBody(taskData);
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
          this.disabled = false;
          const res = await response.json();
          const { message } = res;
          this.message = message;
          this.showModal = true;
          this.buttonRequired = false;
          const indexOfSelectedTask = this.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasks[indexOfSelectedTask];
          const updatedTask = { ...selectedTask, ...cleanBody };
          this.allTasks[indexOfSelectedTask] = updatedTask;
          this.filterTasksByStatus();
        } else {
          alert('Failed to update the task');
          this.disabled = false;
        }
      } catch (err) {
        alert('Failed to update the task');
        console.error('Error : ', err);
      } finally {
        this.isLoading = false;
      }
    }
  }

  @action async handleUpdateTask(taskId) {
    const taskData = this.taskFields;
    if (taskData.percentCompleted === '100') {
      this.message = TASK_MESSAGES.markDone;
      this.showModal = true;
      this.buttonRequired = true;
      this.tempTaskId = taskId;

      return;
    } else {
      this.updateTask(taskId);
    }
  }
}
