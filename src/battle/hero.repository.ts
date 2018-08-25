import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class HeroRepository{
    @Client({ transport: Transport.TCP, options: {port: 3002}})
    client: ClientProxy;

    getHero(id: string): Observable<any>{
        const pattern = { cmd: 'findOne' };
        const data = id;
        return this.client.send<String>(pattern, data);
    }

    
}