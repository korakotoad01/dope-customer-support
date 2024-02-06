import express, { Express, Request, Response } from "express";
import { CustomerSupportService } from "../services/customer-support.service";
import { ClickupService } from "../services/clickup.service";
import { newDate, timeformat } from "../utils/timestamp-format";
const app: Express = express();

const customerSupportService = new CustomerSupportService();
const clickupService = new ClickupService();

app.get("/", async (request: Request, response: Response) => {
  try {
    const res = await customerSupportService.getAll();
    response.send(res.data);
  } catch (error) {
    console.error("Get data Error: ", error);
    response.status(503).send({
      status: 503,
      message: error,
    });
  }
});

app.get("/task/:taskId", async (request: Request, response: Response) => {
  try {
    const res = await customerSupportService.getByid(request.params.taskId);
    response.send(res.data);
  } catch (error) {
    console.error("Get data Error: ", error);
    response.status(503).json({
      status: 503,
      message: error,
    });
  }
});

app.post("/", async (request: Request, response: Response) => {
  try {
    const clickupResponse = await clickupService.createTask(request);
    if (!clickupResponse) response.send("Can't create task");
    const payload = {
      created_at: newDate(),
      update_at: newDate(),
      name: clickupResponse.name,
      description: clickupResponse.description,
      markdown_description: clickupResponse.markdown_description,
      assignees: clickupResponse.assignees,
      tags: clickupResponse.tags,
      status: clickupResponse.status,
      priority: clickupResponse.priority,
      due_date: timeformat(clickupResponse.due_date),
      due_date_time: clickupResponse.due_date_time,
      time_estimate: clickupResponse.time_estimate,
      start_date: timeformat(clickupResponse.start_date),
      start_date_time: clickupResponse.start_date_time,
      notify_all: clickupResponse.notify_all,
      parent: clickupResponse.parent,
      links_to: clickupResponse.links_to,
      check_required_custom_fields:
        clickupResponse.check_required_custom_fields,
      task_id: clickupResponse.id,
      type: request.body.type,
    };
    console.log(payload);
    const res = await customerSupportService.create(payload);
    console.log(res);
    response.send(res);
  } catch (error) {
    response.status(503).send({
      status: 503,
      message: error,
    });
  }
});

app.put("/task/:taskId", async (request: Request, response: Response) => {
  try {
    const clickupResponse = await clickupService.updateTask(request);
    if (!clickupResponse) response.send("Can't update task");
    const payload = {
      update_at: newDate(),
      name: clickupResponse.name,
      description: clickupResponse.description,
      markdown_description: clickupResponse.markdown_description,
      assignees: clickupResponse.assignees,
      tags: clickupResponse.tags,
      status: clickupResponse.status,
      priority: clickupResponse.priority,
      due_date: timeformat(clickupResponse.due_date),
      due_date_time: clickupResponse.due_date_time,
      time_estimate: clickupResponse.time_estimate,
      start_date: timeformat(clickupResponse.start_date),
      start_date_time: clickupResponse.start_date_time,
      notify_all: clickupResponse.notify_all,
      parent: clickupResponse.parent,
      links_to: clickupResponse.links_to,
      check_required_custom_fields:
        clickupResponse.check_required_custom_fields,
      task_id: clickupResponse.id,
      type: request.body.type,
    };
    const res = await customerSupportService.update(payload);
    response.send({ res });
  } catch (error) {
    response.status(503).send({
      status: 503,
      message: error,
    });
  }
});

app.delete("/task/:taskId", async (request: Request, response: Response) => {
  try {
    const clickupResponse = await clickupService.deleteTask(request);
    if (!clickupResponse) response.status(200).json("Can't update task");
    const res = customerSupportService.delete(request);
    response.status(200).send({ res });
  } catch (error) {
    response.status(503).send({
      status: 503,
      message: error,
    });
  }
});

export default app;
