import { All, Controller } from '@nestjs/common';

@Controller({ version: ['1'] })
export class AppController {
  @All('health')
  getHello(): string {
    return 'heart is beating :)';
  }

}
