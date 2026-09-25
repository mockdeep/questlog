import {Controller} from "@hotwired/stimulus";
import Honeybadger from "@honeybadger-io/js";

class HoneybadgerController extends Controller<HTMLElement> {
  static override values = {
    apiKey: String,
    environment: String,
    userId: Number,
  };

  declare readonly apiKeyValue: string;

  declare readonly environmentValue: string;

  declare readonly userIdValue: number;

  declare readonly hasUserIdValue: boolean;

  override connect(): void {
    Honeybadger.configure({
      apiKey: this.apiKeyValue,
      environment: this.environmentValue,
    });

    if (this.hasUserIdValue) {
      Honeybadger.setContext({userId: this.userIdValue});
    }
  }
}

export default HoneybadgerController;
