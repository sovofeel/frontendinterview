import { Complexity } from "./Complexity";

export type Example = {
  title: string;
  source?: string
  complexity: Complexity
  category: string
  tags: string[]
} 