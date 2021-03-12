import { Category } from "./Category";
import { Complexity } from "./Complexity";

export type Task = {
  attributes: {
    id: number;
    title: string;
    description?: string;
    complexity: Complexity
    source?: string
    category: Category
    tags: string[]
  }
  html?: string;
} 