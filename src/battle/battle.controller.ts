import { Controller, Get, Param, Res } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { BattleService } from "./battle.service";
import { Observable} from "rxjs";


@Controller('battle')
export class BattleController {

    constructor(private readonly battleService: BattleService) {}

    @Client({ transport: Transport.TCP, options: {port: 3002}})
    client: ClientProxy;

    @Get('hc')
    healthCheck(){
        const pattern = { cmd : 'test'};
        const data = 'test';
        console.log("Requesting test ...");

        return 'This is working..';
    }
  
    @Get(':id1/:id2')
    battle(@Param('id1') hero1_id: String, @Param('id2') hero2_id: String, @Res() res){
        let hero1;
        let hero2;

        this.getHero(hero1_id).subscribe( result=>{
            hero1 = result;
            },
            error=>{
                res.error;
            }).add( () => {
                this.getHero(hero2_id).subscribe( result =>{
                    hero2 = result;
                },
                    error=>{
                        res.error;
                }).add( () => {
                    res.send(this.battleService.battle(hero1, hero2));
                });
        });        
    }

    getHero(id: String): Observable<any>{
        const pattern = { cmd: 'findOne' };
        return this.client.send<any>(pattern, id);
    }
}