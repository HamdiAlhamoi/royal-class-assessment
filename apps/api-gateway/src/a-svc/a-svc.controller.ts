import { Events, ServiceAToken } from '@app/royal-class/constants';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Service A')
@Controller({ path: 'a-svc', version: ['1'] })
export class AServiceController {
    constructor(
        @Inject(ServiceAToken) private readonly aServiceClient: ClientProxy,
    ) { }

    @Get('double/:num')
    async double(@Param('num') num: string): Promise<number> {
        return firstValueFrom(this.aServiceClient.send(Events.ASVC.doubleNumber, Number(num)));
    }
}
