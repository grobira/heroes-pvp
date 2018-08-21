import { Injectable } from "@nestjs/common";
import { BattleReport } from "./hero/battleReport.interface";
import { Observable, forkJoin } from "rxjs";
import { HeroRepository } from "./hero.repository";


@Injectable()
export class BattleService{
    constructor(private readonly heroRepository: HeroRepository){}


    battle(hero1: string, hero2: string): any{
        const obs = forkJoin(
            this.heroRepository.getHero(hero1),
            this.heroRepository.getHero(hero2)
        )

        return Observable.create((observer) =>{
            obs.subscribe( (data) =>{
                observer.next(data);
            });
        });
    }
}