import { Schema } from 'mongoose';
import chalk from 'chalk';


export const BattleReportSchema = new Schema({
    winner : Schema.ObjectId,
    looser : Schema.ObjectId,
    remaingHp: Number,
    turns: Number,
});

BattleReportSchema.post('save', () => {
    console.log(chalk.green("New Battle Report Created!"))
});
