import { Events, ServiceBToken } from '@app/royal-class/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ASvcService {

  constructor(@Inject(ServiceBToken) private client: ClientProxy) { }
  handleDouble(data: number): Promise<number> {
    return firstValueFrom(this.client.send(Events.BSVC.doubleNumber, Number(data)));
  }
}
