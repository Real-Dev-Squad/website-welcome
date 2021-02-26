import Model, { attr } from '@ember-data/model';

export default class TasksModel extends Model {
  @attr title;
  @attr purpose;
  @attr endsOn;
  @attr startedOn;
  @attr status;
  @attr percentCompleted;
}
