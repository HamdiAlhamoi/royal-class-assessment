import { Events, ServiceBToken } from '@app/royal-class/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { BServiceController } from '../src/b-svc/b-svc.controller';

describe('BServiceController', () => {
    let controller: BServiceController;
    let clientProxy: ClientProxy;

    beforeEach(async () => {
        const mockClientProxy = {
            send: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [BServiceController],
            providers: [
                {
                    provide: ServiceBToken,
                    useValue: mockClientProxy,
                },
            ],
        }).compile();

        controller = module.get<BServiceController>(BServiceController);
        clientProxy = module.get<ClientProxy>(ServiceBToken);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('square', () => {
        it('should send correct event and return squared number', async () => {
            const num = '5';
            const expected = 25;

            jest.spyOn(clientProxy, 'send').mockReturnValue(of(expected));

            const result = await controller.square(num);

            expect(clientProxy.send).toHaveBeenCalledWith(Events.BSVC.squareNumber, 5);
            expect(result).toBe(expected);
        });
    });
});
