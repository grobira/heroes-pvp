import { Controller, Get, Param } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { BattleService } from "./battle.service";
import { Hero } from "./hero/hero.interface";


@Controller('battle')
export class BattleController {

    constructor(private readonly battleService: BattleService) {}

    @Client({ transport: Transport.TCP })
    client: ClientProxy;

    @Get('hc')
    healthCheck(){
        return 'This is working..'
    }
  
    @Get(':id1/:id2')
    battle(@Param('id1') hero1_id: String, @Param('id2') hero2_id: String): any {
        const pattern = { cmd: 'findOne' };
        let hero1, hero2;
        
        this.client.send<any>(pattern, hero1_id)
            .subscribe( data =>{
                console.log(data)
            });
        this.client.send<any>(pattern, hero2_id)
            .subscribe( hero => {
                hero2 = hero;
            });

            console.log('finish clients')
        return this.battleService.battle(hero1, hero2);
    }
    

}