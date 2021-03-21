import { Category } from "./Category";
import { Complexity } from "./Complexity";

export type Question = {
  title: string;
  source?: string
  description?: string
  complexity: Complexity
  category: Category
  type: string
  tags: string[]
} 