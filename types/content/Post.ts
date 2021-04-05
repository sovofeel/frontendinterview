import { Complexity } from "./Complexity";

export type Post = {
  title: string;
  source?: string
  description?: string
  complexity?: Complexity
  category: string
  type: string
  tags?: string[]
}