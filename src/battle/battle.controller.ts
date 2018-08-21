import { Controller, Get, Res, Post, Body } from "@nestjs/common";
import { BattleService } from "./battle.service";
import { Observable } from "rxjs";


@Controller('battle')
export class BattleController {

    constructor(private readonly battleService: BattleService) {}

    @Get('hc')
    healthCheck(){
        return 'This is working..';
    }
  
    @Post('/')
    battle(@Body() heroes, @Res() res){
        this.battleService.battle(heroes.id1, heroes.id2).subscribe((data) => res.send(data));
    }
}