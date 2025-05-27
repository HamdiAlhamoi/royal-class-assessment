import { Events, ServiceBToken } from '@app/royal-class/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ASvcService } from '../src/a-svc.service';

describe('ASvcService', () => {
    let service: ASvcService;
    let client: ClientProxy;

    beforeEach(async () => {
        const mockClient = {
            send: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ASvcService,
                {
                    provide: ServiceBToken,
                    useValue: mockClient,
                },
            ],
        }).compile();

        service = module.get<ASvcService>(ASvcService);
        client = module.get<ClientProxy>(ServiceBToken);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('handleDouble', () => {
        it('should call client.send and return result', async () => {
            jest.spyOn(client, 'send').mockReturnValue(of(42));
            const result = await service.handleDouble(21);
            expect(result).toBe(42);
            expect(client.send).toHaveBeenCalledWith(Events.BSVC.doubleNumber, 21);
        });
    });
});
