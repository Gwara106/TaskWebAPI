import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes.ts";

const app = express();

app.use(bodyParser.json());
app.use("/api", userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
