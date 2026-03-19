export interface Feedback {
  id: string;
  created_at: number;
  name: string;
  email: string;
  text: string;
}

export interface LogEvent {
  id: string;
  creationTime: number;
  event: string;
}
