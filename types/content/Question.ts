import { Complexity } from "./Complexity";

export type Question = {
  title: string;
  source?: string
  description?: string
  complexity?: Complexity
  category: string
  type: string
  tags: string[]
} 