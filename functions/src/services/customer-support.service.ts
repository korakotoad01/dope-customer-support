import { createClient } from "@supabase/supabase-js";
import { Request } from "express";
import {
  CustomerSupportAttributes,
  CustomerSupportCreatorAttributes,
} from "../models/customer-support";
import { newDate, timeformat } from "../utils/timestamp-format";
export class CustomerSupportService {
  constructor() {}

  private supabase = createClient(
    process.env.SUPABASE_URL || "https://arhijwwzgxhnskqfybqu.supabase.co",
    process.env.SUPABASE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaGlqd3d6Z3hobnNrcWZ5YnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MDEwMzksImV4cCI6MjAyMjA3NzAzOX0.AMOPiW56HRaTJaBCsbHb1QrL1_0JMb4c8HEWtQoT57Q"
  );

  async getAll() {
    return await this.supabase.from("customer-support").select("*");
  }
  async getByid(request: Request) {
    return await this.supabase
      .from("task-customer-support")
      .select("*")
      .eq("id", request.params.id);
  }

  async create(
    request: Request,
    clickupResponse: CustomerSupportCreatorAttributes
  ) {
    console.log("clickup response: ", clickupResponse.due_date);
    const payload: CustomerSupportCreatorAttributes = {
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
    return await this.supabase.from("task-customer-support").insert(payload);
  }

  async update(request: Request) {
    const payload: CustomerSupportAttributes = {
      // created_at: this.dateNow,
      update_at: newDate(),
      name: request.body.name,
      description: request.body.description,
      markdown_description: request.body.markdown_description,
      assignees: request.body.assignees,
      tags: request.body.tags,
      status: request.body.status,
      priority: request.body.priority,
      due_date: request.body.due_date,
      due_date_time: request.body.due_dateTime,
      time_estimate: request.body.time_estimate,
      start_date: request.body.start_date,
      start_date_time: request.body.start_date_time,
      notify_all: request.body.notify_all,
      parent: request.body.parent,
      links_to: request.body.links_to,
      check_required_custom_fields: request.body.check_required_custom_fields,
      task_id: request.body.id,
      type:  request.body.type,
    };

    const existData = await this.supabase
      .from("task-customer-support")
      .select("*")
      .eq("task_id", request.params.taskId);

    if (existData.data) {
      return await this.supabase
        .from("task-customer-support")
        .update(payload)
        .eq("task_id", request.params.taskId);
    } else {
      return {
        status: 503,
        message: "Can not find existData ",
      };
    }
  }

  async delete(request: Request) {
    return await this.supabase
      .from("task-customer-support")
      .delete()
      .eq("task_id", request.params.taskId);
  }
}
