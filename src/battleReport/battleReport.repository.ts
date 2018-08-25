import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { BattleReport } from "./model/battleReport.interface";


@Injectable()
export class BattleReportRepository{
    constructor(@InjectModel('BattleReport') private readonly battleReportModel: mongoose.Model<BattleReport>) {}

    async findReports(id: string){
        return await this.battleReportModel.find({winner : mongoose.Types.ObjectId(id)});
    }

    add(br: BattleReport){
        let newReport = this.battleReportModel(br)
        return newReport.save();
    }
}