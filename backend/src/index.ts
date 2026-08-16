import app from "./app.js";
import { env } from "./lib/env.js";

const PORT = env.PORT ?? 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
