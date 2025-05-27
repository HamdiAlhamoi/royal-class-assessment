import { Injectable } from '@nestjs/common';

@Injectable()
export class BSvcService {
  handleDouble(number: number): number {
    return number * 2;
  }

  handleSquare(number: number): number {
    return number ** 2;
  }
}
