import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { HeroRepository } from './hero.repository';
import { BattleReportModule } from '../battleReport/battleReport.module';

@Module({
    imports: [BattleReportModule],
    controllers: [BattleController],
    providers: [BattleService, HeroRepository],
    exports: [BattleService]
})
export class BattleModule {}
