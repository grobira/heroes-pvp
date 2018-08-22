import * as mongoose from 'mongoose';
import { HeroSchema } from '../hero/hero.schema';


export const BattleReportSchema = new mongoose.Schema({
    winner : [HeroSchema],
    looser : [HeroSchema],
    remaingHp: Number,
    turns: Number,
});