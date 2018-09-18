import { Injectable } from "@nestjs/common";
import { Observable, forkJoin, observable, throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
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
                if(data[0] == null){
                    observer.error({error: 404, message:"Hero 1 not found"});
                }else if(data[1] == null){
                    observer.error({error: 404, message:"Hero 2 not found"});
                }else{
                    let hero1 = data[0];
                    let hero2 = data[1];
                    
                    let battleReport = this.doBattle(hero1, hero2);
                    this.battleReportService.add(this.prepareReport(battleReport));
                    //this.updateScores(); To do
                    observer.next(battleReport);
                }
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

    doBattle(hero1, hero2){
        let numTurns : number = 0;
        let winner, looser;
        let battleLog = [];

        while(hero1.hp >= 0 && hero2.hp >=0){
            let damage =  this.strAtk(hero2) + this.intAtk(hero2);
            hero1.hp = Math.round(hero1.hp - damage);
            battleLog.push({ attacker: hero2.firstname , damage: damage, defender: hero1.firstname, remaingHp: hero1.hp});
            damage = this.strAtk(hero1) + this.intAtk(hero1);
            hero2.hp = Math.round(hero2.hp - damage);
            battleLog.push({ attacker: hero1.firstname , damage: damage, defender: hero2.firstname, remaingHp: hero2.hp});
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

        return {"winner" : winner, "looser" : looser, "remaingHp" : Math.round(winner.hp), "turns": numTurns, "log": battleLog};
    }

    strAtk(hero): number{
        let odd = Math.random();
        if ( odd > hero.strAtk.odds + (hero.status.dex/100))
            return 0;

        let damage = (hero.status.str * hero.strAtk.damage * 6) + (Math.random()*100*(hero.status.dex)/2) ;
        return Math.floor(damage*this.isCrit(hero));
    }

    intAtk(hero): number{
        let odd = Math.random();
        if ( odd > hero.intAtk.odds + (hero.status.dex/140))
            return 0;

        let damage = (hero.status.int * hero.intAtk.damage * 20) + (Math.random()*50*(hero.status.dex)/4);
        return Math.floor(damage);
    }

    isCrit(hero): number{
        let odds = Math.random();
        if(odds > 0.05 + hero.status.lck/200 + hero.status.dex/300){
            return 1;
        }
        return 1.5 + (hero.status.lck+hero.status.dex)/180;
    }

}