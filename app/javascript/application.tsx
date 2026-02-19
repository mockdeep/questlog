import "src/_common/globals";
import $ from "jquery";
import Honeybadger from "honeybadger-js";
import "controllers/index";
import {Turbo} from "@hotwired/turbo-rails";
Turbo.session.drive = false;

$(() => $("[class^=flash-]").fadeOut(1500));

require("jquery-ujs");

Honeybadger.configure({
  apiKey: window.gon.honeybadgerApiKey,  
  environment: window.gon.railsEnv,
  onerror: true,
});

Honeybadger.setContext({userId: window.gon.userId});
