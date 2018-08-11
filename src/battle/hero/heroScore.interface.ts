import {Document} from 'mongoose';
import { Hero } from './hero.interface';

export interface HeroScore extends Document{
    hero : Hero;
    score : Number;
    wins: Number;
    looses: Number;
    battles: Number;    
}