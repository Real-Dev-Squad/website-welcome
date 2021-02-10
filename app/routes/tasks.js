import Route from '@ember/routing/route';

export default class TasksRoute extends Route {
  model = async () => {
    console.log('fnjfnj');
    const response = await fetch('api/tasks/tasks.json');
    const { tasks } = await response.json();

    const activeTasks = tasks.filter((task) => task.status === 'Active');
    const blockedTasks = tasks.filter((task) => task.status === 'Blocked');
    const pendingTasks = tasks.filter((task) => task.status === 'Pending');

    return { activeTasks, blockedTasks, pendingTasks };
  };
}
