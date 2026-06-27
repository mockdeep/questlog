import {expect, it} from "vitest";

import {authenticityToken} from "helpers/authenticity_token";

function setToken(content: string): void {
  const meta = document.createElement("meta");
  meta.name = "csrf-token";
  meta.content = content;
  document.head.appendChild(meta);
}

it("returns the token from the csrf meta tag", () => {
  document.head.innerHTML = "";
  setToken("abc123");

  expect(authenticityToken()).toBe("abc123");
});

it("returns an empty string when the meta tag is missing", () => {
  document.head.innerHTML = "";

  expect(authenticityToken()).toBe("");
});

it("returns an empty string when the token is blank", () => {
  document.head.innerHTML = "";
  setToken("");

  expect(authenticityToken()).toBe("");
});
