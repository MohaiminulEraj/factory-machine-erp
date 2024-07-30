import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let user: Repository<User>;

  const mockRegisterUser = {
    name: 'testuser',
    employeeId: 'testuser_123',
    password: '123456',
    confirmPassword: '123456'
  };

  const mockLoginUser = {
    employeeId: 'testuser_123',
    password: '123456'
  };

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      // Test user registration logic here
      mockRepository.save.mockResolvedValue(mockRegisterUser);
      const result = await service.registration(mockRegisterUser);
      expect(mockRepository.save).toHaveBeenCalledWith(mockRegisterUser);
      expect(result).toEqual(mockRegisterUser);

      // const newUser = {
      //   name: 'testuser',
      //   employeeId: 'testuser_123',
      //   password: '123456',
      //   confirmPassword: '123456',
      // };

      // jest.spyOn(user, 'save').mockResolvedValueOnce(mockUser as any);

      // const registeredUser = await service.registration(mockUser);

      // expect(registeredUser).toBeDefined();
      // expect(registeredUser.name).toEqual(mockUser.name);
      // expect(registeredUser.employeeId).toEqual(mockUser.employeeId);
    });

    it('should login a user', async () => {
      mockRepository.findOne.mockResolvedValue(mockLoginUser);
      const result = await service.login(mockLoginUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { employeeId: mockLoginUser.employeeId } });
      expect(result).toEqual(mockLoginUser);
    });

    it('should not register a user with invalid data', async () => {
      // Test user registration with invalid data here

    //   mockRepository.findOne.mockResolvedValue(mockUser);
    // const result = await service.validateUser(mockUser.employeeId, mockUser.password);
    // expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { employeeId: mockUser.employeeId } });
    // expect(result).toEqual(mockUser);

      const newUser = {
        name: 'testuser',
        employeeId: 'testuser_123',
        password: '123456',
        confirmPassword: '1234567',
      };

      await expect(service.registration(newUser)).rejects.toThrowError();
    });
  });

});
