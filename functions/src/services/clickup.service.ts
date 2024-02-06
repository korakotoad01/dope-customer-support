const axios = require("axios");
import { Request } from "express";

export class ClickupService {
  constructor() {}
  async createTask(request: Request) {
    try {
      const bodyAttr = request.body;
      const response = await axios.post(
        `https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`,
        bodyAttr,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.CLICKUP_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async updateTask(request: Request) {
    try {
      const bodyAttr = request.body;
      const response = await axios.put(
        `https://api.clickup.com/api/v2/task/${request.params.taskId}`,
        bodyAttr,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.CLICKUP_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async deleteTask(request: Request) {
    try {
      const response = await axios.delete(
        `https://api.clickup.com/api/v2/task/${request.params.taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.CLICKUP_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleteing task:", error);
    }
  }
}
