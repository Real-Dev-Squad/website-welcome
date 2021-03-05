import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksController extends Controller {
  @tracked showDropDown = false;
  @tracked taskFields = {};
  @tracked allTasks = this.model;

  @action toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  @tracked tasksByStatus = {};
  taskStatusList = ['active', 'pending', 'blocked'];

  filterTasksByStatus(allTasks, status) {
    return allTasks.filter((task) => task.status === status);
  }

  seperateTasksByStatus() {
    this.taskStatusList.forEach((status) => {
      this.tasksByStatus[status] = this.filterTasksByStatus(
        this.allTasks,
        status
      );
    });
  }

  defaultTaskType = 'active';
  @tracked tasksToShow = this.allTasks.filter(
    (task) => task.status === this.defaultTaskType
  );

  @action toggleTasks(taskType) {
    this.seperateTasksByStatus();
    this.tasksToShow = this.tasksByStatus[taskType];
  }

  @action onTaskChange(key, value) {
    this.taskFields[key] = value;
  }

  @action async handleUpdateTask(taskId) {
    const taskData = this.taskFields;
    if (taskData.status === 'completed') {
      taskData.percentCompleted = '100';
    }
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
          const indexOfSelectedTask = this.allTasks.findIndex(
            (task) => task.id === taskId
          );
          const selectedTask = this.allTasks[indexOfSelectedTask];
          const statusOfSelectedTask = selectedTask.status;

          if (taskData.status && taskData.status != selectedTask.status)
            set(selectedTask, 'status', taskData.status);
          if (
            taskData.percentCompleted &&
            taskData.percentCompleted != selectedTask.percentCompleted
          )
            set(selectedTask, 'percentCompleted', taskData.percentCompleted);

          this.toggleTasks(statusOfSelectedTask);
        }
      } catch (err) {
        console.error('Error : ', err);
      }
    }
  }
}
