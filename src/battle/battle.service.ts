import { Injectable } from "@nestjs/common";
import { Hero } from "./hero/hero.interface";


@Injectable()
export class BattleService{
    hero1: any;
    hero2: any;


    battle(hero1: Hero, hero2: Hero){
        
        return { hero1, hero2}
    } 


}