import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class HeroRepository{
    @Client({ transport: Transport.TCP, options: {port: 3002}})
    client: ClientProxy;

    getHero(id: String): Observable<any>{
        const pattern = { cmd: 'findOne' };
        return this.client.send<any>(pattern, id);
    }
}