import Component from '@glimmer/component';
import { action } from '@ember/object';
import { LABEL_TEXT } from '../../constants/signup';

export default class SignupComponent extends Component {
  get label() {
    const { state } = this.args;

    return LABEL_TEXT[state];
  }

  @action inputFieldChanged({ target: { value } }) {
    const { onChange, state } = this.args;
    onChange(state, value);
  }
}
