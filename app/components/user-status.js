import Component from '@glimmer/component';
export default class UserStatusComponent extends Component {
  currentUserStatus = [
    {
      status: 'active',
      message: 'I am doing a task',
      class: 'buttons__idle',
      firstAvailableStatus: 'idle',
      firstStatusMessage: 'Change status to ‘Idle’',
      secondAvailableStatus: 'ooo',
      secondStatusMessage: 'Mark yourself as OOO',
    },
    {
      status: 'idle',
      message: 'I am Idle',
      class: 'buttons__active',
      firstAvailableStatus: 'active',
      firstStatusMessage: 'Change status to ‘Active’',
      secondAvailableStatus: 'ooo',
      secondStatusMessage: 'Mark yourself as OOO',
    },
    {
      status: 'ooo',
      message: 'I am OOO',
      secondAvailableStatus: 'active',
      secondStatusMessage: 'Mark yourself as Active again',
    },
  ];
}
