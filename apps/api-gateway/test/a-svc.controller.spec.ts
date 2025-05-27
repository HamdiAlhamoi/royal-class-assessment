import { Events, ServiceAToken } from '@app/royal-class/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AServiceController } from '../src/a-svc/a-svc.controller';

describe('AServiceController', () => {
    let controller: AServiceController;
    let clientProxy: ClientProxy;

    const mockClientProxy = {
        send: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AServiceController],
            providers: [
                {
                    provide: ServiceAToken,
                    useValue: mockClientProxy,
                },
            ],
        }).compile();

        controller = module.get<AServiceController>(AServiceController);
        clientProxy = module.get<ClientProxy>(ServiceAToken);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('double', () => {
        it('should send correct event and return doubled number', async () => {
            const input = '5';
            const expected = 10;

            // Mock the `send()` to return an observable of the expected value
            mockClientProxy.send.mockReturnValue(of(expected));

            const result = await controller.double(input);

            expect(mockClientProxy.send).toHaveBeenCalledWith(Events.ASVC.doubleNumber, 5);
            expect(result).toBe(expected);
        });
    });
});
