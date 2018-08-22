import { Document } from 'mongoose';
import { Hero } from './hero.interface';

export interface BattleReport extends Document{
    winner : Hero;
    looser : Hero;
    remaingHp: Number;
    turns: Number;    
}