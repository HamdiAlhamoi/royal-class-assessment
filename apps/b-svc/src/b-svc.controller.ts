import { Events } from '@app/royal-class/constants/events';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BSvcService } from './b-svc.service';

@Controller()
export class BSvcController {
  constructor(private readonly bService: BSvcService) { }

  @MessagePattern(Events.BSVC.doubleNumber)
  handleDouble(data: number): number {
    return this.bService.handleDouble(data);
  }

  @MessagePattern(Events.BSVC.squareNumber)
  squareDouble(data: number): number {
    return this.bService.handleSquare(data);
  }
}
