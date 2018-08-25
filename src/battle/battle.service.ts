import { Injectable } from "@nestjs/common";
import { Observable, forkJoin } from "rxjs";
import { HeroRepository } from "./hero.repository";
import chalk from 'chalk';
import { BattleReport } from "battleReport/model/battleReport.interface";
import { BattleReportService } from "battleReport/battleReport.service";

@Injectable()
export class BattleService{
    constructor(private readonly heroRepository: HeroRepository, private readonly battleReportService : BattleReportService){}


    battle(hero1: string, hero2: string): any{
        const obs = forkJoin(
            this.heroRepository.getHero(hero1),
            this.heroRepository.getHero(hero2)
        )

        return  Observable.create((observer) =>{
            obs.subscribe( (data) =>{
                let hero1 = data[0];
                let hero2 = data[1];
                
                let battleReport = this.doBattle(hero1, hero2);
                this.battleReportService.add(this.prepareReport(battleReport));
                //this.updateScores(); To do
                observer.next(battleReport);
            });

        });
    }

    prepareReport(battleReport){
        let report = {
            'winner' : battleReport.winner._id,
            'looser' : battleReport.looser._id,
            'remaingHp' : battleReport.remaingHp,
            'turns' : battleReport.turns,
        }
        return report;
    }

    doBattle(hero1, hero2): BattleReport{
        let numTurns : number = 0;
        let winner, looser;

        while(hero1.hp >= 0 && hero2.hp >=0){
            let damage =  this.strAtk(hero2) + this.intAtk(hero2);
            hero1.hp = hero1.hp - damage;
            console.log(chalk.blue(`${hero1.firstname} take ${damage}. Remaing HP = ${hero1.hp}`));
            damage = this.strAtk(hero1) + this.intAtk(hero1);
            hero2.hp = hero2.hp - damage;
            console.log(chalk.magenta(`${hero2.firstname} take ${damage}. Remaing HP = ${hero2.hp}`));
            numTurns++;
        }

        if(hero1.hp > hero2.hp){
            winner = hero1;
            looser = hero2;
        }else{
            winner = hero2;
            looser = hero1;
        }

        if(winner.hp < 0)
            winner.hp = 1;
        console.log(chalk.red(`${winner.firstname} is the winner with ${winner.hp} HP. The battle took ${numTurns} turns.`));

        return {"winner" : winner, "looser" : looser, "remaingHp" : Math.round(winner.hp), "turns": numTurns};
    }

    strAtk(hero): number{
        let odd = Math.random();
        if ( odd < hero.strAtk.odds + (hero.status.dex/100))
            return 0;

        let damage = (hero.status.str * hero.strAtk.damage * 6) + (Math.random()*100*(hero.status.dex)/2) ;
        return Math.floor(damage*this.isCrit(hero));
    }

    intAtk(hero): number{
        let odd = Math.random();
        if ( odd < hero.intAtk.odds + (hero.status.dex/140))
            return 0;

        let damage = (hero.status.int * hero.intAtk.damage * 20) + (Math.random()*50*(hero.status.dex)/4);
        return Math.floor(damage);
    }

    isCrit(hero): number{
        let odds = 0.05 + hero.status.lck/120 + hero.status.dex/200;
        if(odds < Math.random()){
            return 1.5 + (hero.status.lck+hero.status.dex)/150;
        }
        return 1;
    }

}