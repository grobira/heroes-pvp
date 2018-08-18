import { Injectable } from "@nestjs/common";
import { BattleReport } from "./battleReport.interface";
import { Observable } from "rxjs";
import { HeroRepository } from "./hero.repository";


@Injectable()
export class BattleService{
    constructor(private readonly heroRepository: HeroRepository){}


    battle(hero1: string, hero2: string, res): BattleReport{
        let hero = [];

        let obs = Observable.create( observer =>{
            this.heroRepository.getHero(hero1).subscribe( data =>{
                observer.next(data);
            });
            this.heroRepository.getHero(hero2).subscribe( data =>{
                observer.next(data);
            }).add(()=> observer.next());
        });

        obs.subscribe(data => {
            if(data)
                hero.push(data);
            else{
                res.send(hero);
            }
        });
        return null
    } 
}