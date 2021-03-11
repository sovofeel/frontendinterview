import { Category } from "./Category";
import { Complexity } from "./Complexity";

export type Question = {
  attributes: {
    id: number;
    title: string;
    source?: string
    description?: string
    complexity: Complexity
    category: Category
    tags: string[]
  }
  html?: string;
  slug?: string;
} 