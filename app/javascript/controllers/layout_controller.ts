import {Controller} from "@hotwired/stimulus";

class LayoutController extends Controller {
  static override targets = ["expandedSidebar", "collapsedSidebar"];

  expandedSidebarTarget!: HTMLElement;

  collapsedSidebarTarget!: HTMLElement;

  override connect(): void {
    this.updateScreenSize();
  }

  updateScreenSize(): void {
    const visible = window.innerWidth > 600;
    this.toggleSidebarVisibility({visible});
  }

  toggleSidebarVisibility({visible}: {visible: boolean}): void {
    this.element.classList.toggle("sidebar-open", visible);
    this.expandedSidebarTarget.classList.toggle("hide-me", !visible);
    this.collapsedSidebarTarget.classList.toggle("hide-me", visible);
  }

  hideSidebar(): void {
    this.toggleSidebarVisibility({visible: false});
  }

  showSidebar(): void {
    this.toggleSidebarVisibility({visible: true});
  }
}

export default LayoutController;
