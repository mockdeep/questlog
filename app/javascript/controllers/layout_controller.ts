import {Controller} from '@hotwired/stimulus';

class LayoutController extends Controller {
  static targets = ['expandedSidebar', 'collapsedSidebar'];

  expandedSidebarTarget!: HTMLElement;

  collapsedSidebarTarget!: HTMLElement;

  connect() {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const visible = window.innerWidth > 600;
    this.toggleSidebarVisibility({visible});
  }

  toggleSidebarVisibility({visible}: {visible: boolean}) {
    this.element.classList.toggle('sidebar-open', visible);
    this.expandedSidebarTarget.classList.toggle('hide-me', !visible);
    this.collapsedSidebarTarget.classList.toggle('hide-me', visible);
  }

  hideSidebar() {
    this.toggleSidebarVisibility({visible: false});
  }

  showSidebar() {
    this.toggleSidebarVisibility({visible: true});
  }
}

export default LayoutController;
