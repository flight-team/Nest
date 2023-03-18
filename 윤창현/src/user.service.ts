import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  // Create
  createUser(user: User): User {
    const newUserId = this.users.length + 1;
    const newUser = { id: newUserId, ...user };
    this.users.push(newUser);
    return newUser;
  }

  // Read all
  getUsers(): User[] {
    return this.users;
  }

  // Read one
  getUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  // Update
  updateUser(id: number, user: User): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { id, ...user };
      return this.users[index];
    }
    return null;
  }

  // Delete
  deleteUser(id: number): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users[index];
      this.users.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
}
