import app from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  console.log(`API on http://localhost:${config.port}`);
});
