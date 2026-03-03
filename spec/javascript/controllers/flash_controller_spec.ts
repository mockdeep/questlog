import {bootStimulus} from "support/stimulus";
import FlashController from "controllers/flash_controller";
import {assert} from "helpers/assert";

type OnFinish = (() => void) | null;

function mockAnimate(): {
  animateSpy: ReturnType<typeof vi.fn>;
  getOnFinish: () => OnFinish;
} {
  let onfinish: OnFinish = null;

  const animateSpy = vi.fn().mockReturnValue({
    set onfinish(cb: OnFinish) { onfinish = cb; },
    get onfinish(): OnFinish { return onfinish; },
  });

  HTMLElement.prototype.animate = animateSpy;

  return {
    animateSpy,
    getOnFinish: (): OnFinish => { return onfinish; },
  };
}

function setupDOM(): void {
  document.body.innerHTML = `
    <div data-controller="flash" class="flash-notice">Success</div>
  `;
}

async function setupController(): Promise<void> {
  setupDOM();

  await bootStimulus("flash", FlashController);
}

function element(): HTMLElement {
  const selector = "[data-controller='flash']";

  return assert(document.querySelector<HTMLElement>(selector));
}

describe("flashController", () => {
  it("animates the element to opacity 0 on connect", async () => {
    const {animateSpy} = mockAnimate();

    await setupController();

    expect(animateSpy).toHaveBeenCalledWith(
      {opacity: [1, 0]},
      {duration: 1500, fill: "forwards"},
    );
  });

  it("removes the element when the animation finishes", async () => {
    const {getOnFinish} = mockAnimate();

    await setupController();

    const el = element();

    assert(getOnFinish())();

    expect(el.parentNode).toBeNull();
  });
});
