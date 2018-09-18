import * as mongoose from 'mongoose';
import { HeroSchema } from '../hero/hero.schema';


export const HeroScoreSchema = new mongoose.Schema({
    hero : [HeroSchema],
    score : Number,
    wins: Number,
    looses: Number,
    battles: Number    
});