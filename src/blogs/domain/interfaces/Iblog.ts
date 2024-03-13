export interface Iblog {
  id: string;
  creator: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

export interface IBlogUpdate {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}
