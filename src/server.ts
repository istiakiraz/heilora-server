import app from "./app";
import { envVars } from "./config/env";

const bootstrap = () => {
  try {
    app.listen(parseInt(envVars.PORT), () => {
      console.log(
        `Heilora server is running on http://localhost:${envVars.PORT}`,
      );
    });
  } catch (error) {
    console.log("Failed to start server:", error);
  }
};

bootstrap();
