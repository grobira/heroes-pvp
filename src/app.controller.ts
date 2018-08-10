import { Get, Controller } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get()
  call(): any {
    const pattern = { cmd: 'findOne' };
    const data = "5b6c846fbb86bafb87304a29";
    return this.client.send<String>(pattern, data);
  }
}
