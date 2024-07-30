import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './../src/modules/auth/auth.module';
import { AuthService } from './../src/modules/auth/service/auth.service';

describe('AuthModule (e2e)', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('User Registration', () => {
    it('should register a new user', async () => {
      const newUser = {
        name: 'testuser',
        employeeId: 'testuser_123',
        password: '123456',
        confirmPassword: '123456',
      };

      const registeredUser = await authService.registration(newUser);

      expect(registeredUser).toBeDefined();
      expect(registeredUser.name).toEqual(newUser.name);
      expect(registeredUser.employeeId).toEqual(newUser.employeeId);
    });

    it('should not register a user with invalid data', async () => {
      const newUser = {
        name: 'testuser',
        employeeId: 'testuser_123',
        password: '123456',
        confirmPassword: '1234567',
      };

      await expect(authService.registration(newUser)).rejects.toThrowError();
    });
  });

  describe('Login', () => {
    it('should login a user with valid credentials', async () => {

      const credentials = {
        employeeId: 'testuser_123',
        password: '123456',
      };

      const loggedInUser = await authService.login(credentials);

      expect(loggedInUser).toBeDefined();
      expect(loggedInUser.employeeId).toEqual(credentials.employeeId);
    });

    it('should not login a user with invalid credentials', async () => {
      const credentials = {
        employeeId: 'testuser_321',
        password: '123456',
      };

      await expect(authService.login(credentials)).rejects.toThrowError();

    });
  });
});