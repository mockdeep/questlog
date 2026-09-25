import "./_common/globals";
import "controllers/index";
import "@hotwired/turbo-rails";
import {session} from "@hotwired/turbo";

session.drive = false;
