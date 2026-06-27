import {Application} from "@hotwired/stimulus";
import {expect, it} from "vitest";

import {application} from "controllers/application";

it("starts a stimulus application", () => {
  expect(application).toBeInstanceOf(Application);

  application.stop();
});
