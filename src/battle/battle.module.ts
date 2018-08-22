import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { HeroRepository } from './hero.repository';
import { BattleReportSchema } from './hero/battleReport.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'BattleReport', schema: BattleReportSchema}])],
    controllers: [BattleController],
    providers: [BattleService, HeroRepository],
    exports: [BattleService]
})
export class BattleModule {}
