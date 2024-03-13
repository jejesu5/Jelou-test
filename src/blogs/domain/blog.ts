import { Iblog } from './interfaces/Iblog';
export class Blog {
  id: string;
  title: string;
  creator: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;

  constructor(creator: string, title: string, content: string) {
    this.creator = creator;
    this.title = title;
    this.content = content;
  }

  static create(
    creator: string,
    title: string,
    content: string,
    category: string,
    tags: string[],
  ): Blog {
    const blog = new Blog(creator, title, content);
    blog.setCategory(category);
    blog.setTags(tags);
    return blog;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getCreator(): string {
    return this.creator;
  }

  public setCreator(creator: string): void {
    this.creator = creator;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(category: string): void {
    this.category = category;
  }

  public getTags(): string[] {
    return this.tags;
  }

  public setTags(tags: string[]): void {
    this.tags = tags;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getProperties(): Iblog {
    return {
      id: this.getId(),
      creator: this.getCreator(),
      title: this.getTitle(),
      content: this.getContent(),
      category: this.getCategory(),
      tags: this.getTags(),
      createdAt: this.getCreatedAt(),
    };
  }
}
