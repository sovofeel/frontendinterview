import { Category } from "./Category";
import { Complexity } from "./Complexity";

export type Example = {
  attributes: {
    id: number;
    title: string;
    source?: string
    complexity: Complexity
    category: Category
    tags: string[]
  }
  html?: string;
  slug?: string;
} 