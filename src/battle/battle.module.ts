import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { HeroRepository } from './hero.repository';
import { HeroScoreSchema } from './heroScore/heroScore.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'HeroScore', schema: HeroScoreSchema}])],
    controllers: [BattleController],
    providers: [BattleService, HeroRepository],
    exports: [BattleService]
})
export class BattleModule {}
