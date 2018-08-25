import { Document, ObjectId } from 'mongoose';

export interface BattleReport extends Document{
    winner : ObjectId;
    looser : ObjectId;
    remaingHp: Number;
    turns: Number;    
}