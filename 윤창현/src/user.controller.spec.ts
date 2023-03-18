import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from './user.interface';
import { UserService } from './user.service';

describe('AppController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const result: User[] = [
        { id: 1, name: 'John', email: 'john@test.com', password: 'asdf' },
        { id: 2, name: 'Jane', email: 'Jane@test.com', password: 'qwer' },
      ];
      jest.spyOn(service, 'getUsers').mockImplementation(() => result);
      expect(controller.getUsers()).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', () => {
      const result: User = {
        id: 1,
        name: 'John',
        email: 'john@test.com',
        password: 'asdf',
      };
      jest.spyOn(service, 'getUserById').mockImplementation(() => result);
      expect(controller.getUserById(1)).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const user: User = {
        id: 3,
        name: 'Alex',
        email: 'alex@test.com',
        password: 'asdf1234',
      };
      jest.spyOn(service, 'createUser').mockImplementation(() => user);
      expect(controller.createUser(user)).toBe(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'john@test.co.kr',
        password: 'asdf12345',
      };
      jest.spyOn(service, 'updateUser').mockImplementation(() => user);
      expect(controller.updateUser(1, user)).toBe(user);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'john@test.com',
        password: 'asdf',
      };
      jest.spyOn(service, 'deleteUser').mockImplementation(() => user);
      expect(controller.deleteUser(1)).toBe(user);
    });
  });
});
