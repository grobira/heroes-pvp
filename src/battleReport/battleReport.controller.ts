import { Controller, Get, Query } from "@nestjs/common";
import { BattleReportService } from "./battleReport.service";


@Controller('reports')
export class BattleReportController{
    constructor(private readonly battleReportService: BattleReportService) {}

    @Get()
    async findReports(@Query('id') id : string){
        return await this.battleReportService.findReports(id);
    }
}