import { Document } from 'mongoose';
import { Hero } from './hero.interface';

export interface BattleReport extends Document{
    hero1 : Hero;
    hero2 : Hero;
    winner: Hero;
    remaingHp: Number;
    turns: Number;    
}