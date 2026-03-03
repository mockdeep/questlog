import "./_common/globals";
import Honeybadger from "honeybadger-js";
import "controllers/index";
import {Turbo} from "@hotwired/turbo-rails";
Turbo.session.drive = false;


Honeybadger.configure({
  apiKey: window.gon.honeybadgerApiKey,  
  environment: window.gon.railsEnv,
  onerror: true,
});

Honeybadger.setContext({userId: window.gon.userId});
