import { Injectable } from "@nestjs/common";
import { BattleReportRepository } from "./battleReport.repository";
import { BattleReport } from "./model/battleReport.interface";


@Injectable()
export class BattleReportService{
    constructor(private readonly battleReportRepository: BattleReportRepository) {}

    async findReports(id : string){
        return await this.battleReportRepository.findReports(id);
    }

    add(br : BattleReport) {
        return this.battleReportRepository.add(br);
    }

}