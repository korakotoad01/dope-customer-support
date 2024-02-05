import express, { Express, Request, Response } from "express";
import { CustomerSupportService } from "../services/customer-support.service";
import { ClickupService } from "../services/clickup.service";
const app: Express = express();

const customerSupportService = new CustomerSupportService();
const clickupService = new ClickupService();

app.get("/", async (response: Response) => {
  try {
    const res = await customerSupportService.getAll();
    console.log(res.data);
    return response.status(200).json(res.data);
  } catch (error) {
    console.error("Get data Error: ", error);
    return response.status(503).json({ status: 503, message: error });
  }
});

app.get("/:id", async (request: Request, response: Response) => {
  try {
    const res = await customerSupportService.getByid(request);
    return response.status(200).json(res.data);
  } catch (error) {
    console.error("Get data Error: ", error);
    return response.status(503).json({ status: 503, message: error });
  }
});

app.post("/", async (request: Request, response: Response) => {
  try {
    const clickupResponse = await clickupService.createTask(request);
    if (!clickupResponse) return response.status(200).json("Can't create task");
    const res = await customerSupportService.create(request,clickupResponse.data);
    return response.status(200).json(res);
  } catch (error) {
    return response.status(503).json({
      status: 503,
      message: error,
    });
  }
});

app.put("/task-id/:taskId", async (request: Request, response: Response) => {
  try {
    const clickupResponse = await clickupService.updateTask(request);
    if (!clickupResponse) return response.status(200).json("Can't update task");
    const res = await customerSupportService.update(request);
    return response.status(200).json({ res });
  } catch (error) {
    return response.status(503).json({
      status: 503,
      message: error,
    });
  }
});

app.delete("/task-id/:taskId", async (request: Request, response: Response) => {
  try {
    const clickupResponse = await clickupService.deleteTask(request);
    if (!clickupResponse) return response.status(200).json("Can't update task");
    const res = customerSupportService.delete(request);
    return response.status(200).json({ res });
  } catch (error) {
    return response.status(503).json({
      status: 503,
      message: error,
    });
  }
});

export default app;
