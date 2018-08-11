import { Injectable } from "@nestjs/common";
import { Hero } from "./hero/hero.interface";
import { BattleReport } from "./battleReport.interface";


@Injectable()
export class BattleService{
    hero1: any;
    hero2: any;


    battle(hero1: Hero, hero2: Hero): BattleReport{
        // do battle and return battle report
        console.log(hero1);
        console.log(hero2);
        return null
    } 


}