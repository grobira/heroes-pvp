import { Controller, Get, Res, Post, Body } from "@nestjs/common";
import { BattleService } from "./battle.service";


@Controller('battle')
export class BattleController {

    constructor(private readonly battleService: BattleService) {}

    @Get('hc')
    healthCheck(){
        return 'This is working..';
    }
  
    @Post('/')
    battle(@Body('id1') id1: string, @Body('id2') id2: string, @Res() res){
        this.battleService.battle(id1, id2, res);
    }
}