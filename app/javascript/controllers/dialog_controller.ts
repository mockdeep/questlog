import A11yDialog from 'a11y-dialog';
import {Controller} from '@hotwired/stimulus';

// rename to DialogController
class DialogController extends Controller {
  connect() {
    new A11yDialog(this.element).show();
  }
}

export default DialogController;
