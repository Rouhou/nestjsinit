import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
       providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined (controller)', () => {
    expect(controller).toBeDefined();
  });
  it('should be defined (service)', () => {
    expect(service).toBeDefined();
  });
});
