import { Get, Controller } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP, options: {port:3002} })
  client: ClientProxy;

  @Get()
  call(): any {
    const pattern = { cmd: 'findOne' };
    const data = "5b7c6461ecb9835c7491d6d0";
    return this.client.send<String>(pattern, data);
  }
}
