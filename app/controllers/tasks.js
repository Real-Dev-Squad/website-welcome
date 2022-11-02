import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ENV from 'website-my/config/environment';
import { TASK_KEYS, TASK_STATUS_LIST } from 'website-my/constants/tasks';
import { TASK_MESSAGES, TASK_PERCENTAGE } from '../constants/tasks';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksController extends Controller {
  TASK_KEYS = TASK_KEYS;
  taskStatusList = TASK_STATUS_LIST;
  allTasksObject = this.taskStatusList.find(
    (obj) => obj.key === this.TASK_KEYS.ALL
  );
  DEFAULT_TASK_TYPE = this.allTasksObject;

  @tracked isUpdating = false;
  @tracked assignTask = false;
  @tracked closeDisabled = false;
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
    const requestBody = { ...object };
    const taskCompletionPercentage = object.percentCompleted;
    if (taskCompletionPercentage) {
      if (taskCompletionPercentage === TASK_PERCENTAGE.completedPercentage) {
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
    this.message = TASK_MESSAGES.UPDATE_TASK;
    this.isUpdating = true;
    this.closeDisabled = true;
  }

  @action markCompleteAndAssignTask() {
    this.assignTask = true;
    this.message = TASK_MESSAGES.UPDATE_TASK;
    this.isUpdating = true;
    this.updateTask(this.tempTaskId);
    this.closeDisabled = true;
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
    this.isLoading = true;
    this.disabled = true;
    this.buttonRequired = false;
    const taskData = this.taskFields;
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
          this.showModal = true;
          const res = await response.json();
          const { message } = res;
          this.message = message;
          const indexOfSelectedTask = this.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasks[indexOfSelectedTask];
          const updatedTask = { ...selectedTask, ...cleanBody };
          this.allTasks[indexOfSelectedTask] = updatedTask;
          this.filterTasksByStatus();
          if (this.assignTask === true) {
            this.assingTaskFunction();
          } else {
            this.isUpdating = false;
            this.closeDisabled = false;
          }
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

  @action async assingTaskFunction() {
    this.assignTask = false;
    setTimeout(async () => {
      this.message = TASK_MESSAGES.FIND_TASK;
      const response = await fetch(`${API_BASE_URL}/tasks/assign/self`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const res = await response.json();
      const { message } = res;
      this.message = message;
      this.isUpdating = false;
      this.closeDisabled = false;
    }, 2000);
  }

  @action async handleUpdateTask(taskId) {
    const taskData = this.taskFields;
    if (taskData.percentCompleted === TASK_PERCENTAGE.completedPercentage) {
      this.message = TASK_MESSAGES.MARK_DONE;
      this.showModal = true;
      this.buttonRequired = true;
      this.tempTaskId = taskId;
      return;
    } else {
      this.updateTask(taskId);
    }
  }
}
