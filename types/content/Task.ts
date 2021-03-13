import { Category } from "./Category";
import { Complexity } from "./Complexity";

export type Task = {
  title: string;
  description?: string;
  complexity: Complexity
  source?: string
  category: Category
  tags: string[]
} 