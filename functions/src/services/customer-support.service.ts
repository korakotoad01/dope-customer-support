import { createClient } from "@supabase/supabase-js";
import { Request } from "express";
import {
  CustomerSupportAttributes,
  CustomerSupportCreatorAttributes,
} from "../models/customer-support";
export class CustomerSupportService {
  constructor() {}

  private supabase = createClient(
    process.env.SUPABASE_URL || "https://arhijwwzgxhnskqfybqu.supabase.co",
    process.env.SUPABASE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaGlqd3d6Z3hobnNrcWZ5YnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MDEwMzksImV4cCI6MjAyMjA3NzAzOX0.AMOPiW56HRaTJaBCsbHb1QrL1_0JMb4c8HEWtQoT57Q"
  );

  async getAll() {
    return await this.supabase.from("task-customer-support").select("*");
  }

  async getByid(taskId: string) {
    return await this.supabase
      .from("task-customer-support")
      .select("*")
      .eq("task_id", taskId);
  }

  async create(payload: CustomerSupportCreatorAttributes) {
    return await this.supabase.from("task-customer-support").insert(payload);
  }

  async update(payload: CustomerSupportAttributes) {
    console.log("payload.task_id: ", payload.task_id);
    const existData = await this.supabase
      .from("task-customer-support")
      .select("*")
      .eq("task_id", payload.task_id);

    if (existData.data) {
      return await this.supabase
        .from("task-customer-support")
        .update(payload)
        .eq("task_id", payload.task_id);
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
