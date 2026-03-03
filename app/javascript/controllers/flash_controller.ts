import {Controller} from "@hotwired/stimulus";

class FlashController extends Controller<HTMLElement> {
  override connect(): void {
    this.element.animate(
      {opacity: [1, 0]},
      {duration: 1500, fill: "forwards"},
    ).onfinish = (): void => { this.element.remove(); };
  }
}

export default FlashController;
