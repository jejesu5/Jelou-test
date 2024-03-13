import { IUser } from './interfaces/IUser';
export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static create(username: string, email: string, password: string): User {
    const user = new User(username, email, password);
    return user;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getProperties(): IUser {
    return {
      id: this.getId(),
      username: this.getUsername(),
      email: this.getEmail(),
      password: this.getPassword(),
      createdAt: this.getCreatedAt(),
    };
  }
}
