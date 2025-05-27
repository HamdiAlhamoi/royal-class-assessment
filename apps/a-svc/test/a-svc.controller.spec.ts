import { Test, TestingModule } from '@nestjs/testing';
import { ASvcController } from '../src/a-svc.controller';
import { ASvcService } from '../src/a-svc.service';

describe('ASvcController', () => {
    let controller: ASvcController;
    let service: ASvcService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ASvcController],
            providers: [
                {
                    provide: ASvcService,
                    useValue: {
                        handleDouble: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ASvcController>(ASvcController);
        service = module.get<ASvcService>(ASvcService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handleDouble', () => {
        it('should return double from service', async () => {
            jest.spyOn(service, 'handleDouble').mockResolvedValue(20);
            const result = await controller.handleDouble(10);
            expect(result).toBe(20);
            expect(service.handleDouble).toHaveBeenCalledWith(10);
        });
    });
});
