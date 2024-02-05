export interface CustomerSupportAttributes {
  created_at?: string;
  update_at?: string;
  name: string;
  description: string;
  markdown_description: string;
  assignees: string;
  tags: string;
  status: string;
  priority: string;
  due_date: string;
  due_date_time: boolean;
  time_estimate: number;
  start_date: string;
  start_date_time: boolean;
  notify_all: boolean;
  parent: string;
  links_to: string;
  check_required_custom_fields: boolean;
  task_id?: string;
  type: string;
  id?: string;
}

export type CustomerSupportCreatorAttributes = Pick<
  CustomerSupportAttributes,
  | "id"
  | "created_at"
  | "update_at"
  | "name"
  | "description"
  | "markdown_description"
  | "assignees"
  | "tags"
  | "status"
  | "priority"
  | "due_date"
  | "due_date_time"
  | "time_estimate"
  | "start_date"
  | "start_date_time"
  | "notify_all"
  | "parent"
  | "links_to"
  | "check_required_custom_fields"
  | "task_id"
  | "type"
>;

export interface CustomerSupportInstance extends CustomerSupportAttributes {}
