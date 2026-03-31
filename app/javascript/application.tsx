import "./_common/globals";
import Honeybadger from "honeybadger-js";
import "controllers/index";
import "@hotwired/turbo-rails";
import {session} from "@hotwired/turbo";

session.drive = false;


Honeybadger.configure({
  apiKey: window.gon.honeybadgerApiKey,  
  environment: window.gon.railsEnv,
  onerror: true,
});

Honeybadger.setContext({userId: window.gon.userId});
