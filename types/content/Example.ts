import { Category } from "./Category";
import { Complexity } from "./Complexity";

export type Example = {
  title: string;
  source?: string
  complexity: Complexity
  category: Category
  tags: string[]
} 