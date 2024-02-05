
import {onRequest} from "firebase-functions/v2/https";
import express, {Express} from "express";

const app: Express = express();

/** Import submodules with their route handlers */
import customerSupportRoutes from "./routes/customer-support.routes";

/** Add route handlers to Express app */
app.use("/", customerSupportRoutes);
export const customerSupportService = onRequest(app);


