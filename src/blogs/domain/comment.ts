export class Comment {
  private id: string;
  private creator: string;
  private blog: string;
  private content: string;
  private createdAt: Date;

  constructor(creator: string, blog: string, content: string) {
    this.creator = creator;
    this.blog = blog;
    this.content = content;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getCreator(): string {
    return this.creator;
  }

  public setCreator(creator: string): void {
    this.creator = creator;
  }

  public getBlog(): string {
    return this.blog;
  }

  public setBlog(blog: string): void {
    this.blog = blog;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public static create(
    creator: string,
    blog: string,
    content: string,
  ): Comment {
    return new Comment(creator, blog, content);
  }

  public getProperties() {
    return {
      creator: this.getCreator(),
      blog: this.getBlog(),
      content: this.getContent(),
    };
  }
}
