declare module '@hotwired/turbo-rails' {
  type TurboSession = {
    drive: boolean;
  }

  type Turbo = {
    session: TurboSession;
  }

  export const Turbo: Turbo;
}
