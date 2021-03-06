import { Complexity } from "./Complexity";

export type Task = {
  title: string;
  description?: string;
  complexity?: Complexity
  source?: string
  category: string
  type: string
  tags: string[]
} 