import { BSvcService } from '../src/b-svc.service';

describe('BSvcService', () => {
    let service: BSvcService;

    beforeEach(() => {
        service = new BSvcService();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('handleDouble', () => {
        it('should return double the input number', () => {
            expect(service.handleDouble(2)).toBe(4);
            expect(service.handleDouble(-3)).toBe(-6);
            expect(service.handleDouble(0)).toBe(0);
        });
    });

    describe('handleSquare', () => {
        it('should return square of the input number', () => {
            expect(service.handleSquare(2)).toBe(4);
            expect(service.handleSquare(-3)).toBe(9);
            expect(service.handleSquare(0)).toBe(0);
        });
    });
});
