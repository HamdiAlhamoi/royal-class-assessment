import { Events } from '@app/royal-class/constants/events';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ASvcService } from './a-svc.service';

@Controller()
export class ASvcController {
  constructor(private readonly aService: ASvcService) { }

  @MessagePattern(Events.ASVC.doubleNumber)
  handleDouble(data: number): Promise<number> {
    return this.aService.handleDouble(data)
  }
}
