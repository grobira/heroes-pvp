import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BattleReportSchema } from "./model/battleReport.schema";
import { BattleReportController } from "./battleReport.controller";
import { BattleReportRepository } from "./battleReport.repository";
import { BattleReportService } from "./battleReport.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'BattleReport', schema: BattleReportSchema}])],
    controllers: [BattleReportController],
    providers: [BattleReportService, BattleReportRepository],
    exports: [BattleReportService]
})
export class BattleReportModule {}