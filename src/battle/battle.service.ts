import { Injectable } from "@nestjs/common";
import { Observable, forkJoin } from "rxjs";
import { HeroRepository } from "./hero.repository";
import * as chalk from 'chalk';
import { InjectModel } from "@nestjs/mongoose";
import { HeroScore } from "./heroScore/heroScore.interface";
import { Model } from 'mongoose';

@Injectable()
export class BattleService{
    constructor(private readonly heroRepository: HeroRepository,
        @InjectModel('HeroScore') private readonly scoreModel: Model<HeroScore>){}


    battle(hero1: string, hero2: string): any{
        const obs = forkJoin(
            this.heroRepository.getHero(hero1),
            this.heroRepository.getHero(hero2)
        )

        return  Observable.create((observer) =>{
            obs.subscribe( async (data) =>{
                let hero1 = data[0];
                let hero2 = data[1];

                let looser;
                let winner = this.doBattle(hero1, hero2);
                if(winner._id == hero1._id)
                    looser = hero2;
                else
                    looser = hero1;

                observer.next(winner);
            });

        });
    }

    doBattle(hero1, hero2){
        let numTurns : number = 0;

        while(hero1.hp >= 0 && hero2.hp >=0){
            let damage =  this.strAtk(hero2)*this.isCrit(hero2) + this.intAtk(hero2);
            hero1.hp = hero1.hp - damage;
            console.log(chalk.blue(`${hero1.firstname} take ${damage}. Remaing HP = ${hero1.hp}`));
            damage = this.strAtk(hero1)*this.isCrit(hero1) + this.intAtk(hero1);
            hero2.hp = hero2.hp - damage;
            console.log(chalk.magenta(`${hero2.firstname} take ${damage}. Remaing HP = ${hero2.hp}`));
            numTurns++;
        }

        let winner;

        if(hero1.hp > hero2.hp)
            winner = hero1;
        else
            winner = hero2;

        console.log(chalk.red(`${winner.firstname} is the winner with ${winner.hp} HP. The battle took ${numTurns} turns.`));

        return winner;
    }

    strAtk(hero): number{
        let odd = Math.random();
        if ( odd < hero.strAtk.odds)
            return 0;

        let damage = hero.status.str * hero.multipliers.str * 10;
        return damage;
    }

    intAtk(hero): number{
        let odd = Math.random();
        if ( odd < hero.intAtk.odds)
            return 0;

        let damage = hero.status.int * hero.multipliers.int * 50;
        return damage;
    }

    isCrit(hero): number{
        let odds = 5 + hero.status.lck/3 + hero.status.dex/10;
        if(odds < Math.random())
            return 1.5;
        
        return 1;
    }

}