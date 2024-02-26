import { Test, TestingModule } from '@nestjs/testing';
import { TamaraController } from './tamara.controller';

describe('TamaraController', () => {
  let controller: TamaraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TamaraController],
    }).compile();

    controller = module.get<TamaraController>(TamaraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
