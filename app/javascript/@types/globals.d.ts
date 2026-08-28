type Gon = {
  honeybadgerApiKey: string;
  railsEnv: "development" | "production" | "test";
  userId: number;
};

interface Window {
  debug: () => void;
  gon: Gon;
}

type Callback = { (): void };
