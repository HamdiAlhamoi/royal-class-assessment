import { Events, ServiceBToken } from '@app/royal-class/constants';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Service B')
@Controller({ path: 'b-svc', version: ['1'] })
export class BServiceController {
    constructor(
        @Inject(ServiceBToken) private readonly bServiceClient: ClientProxy,
    ) { }

    @Get('square/:num')
    async square(@Param('num') num: string): Promise<number> {
        return firstValueFrom(this.bServiceClient.send(Events.BSVC.squareNumber, Number(num)));
    }
}
