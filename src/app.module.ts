import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattleController } from './battle/battle.controller';
import { BattleService } from './battle/battle.service';
import { HeroRepository } from './battle/hero.repository';

@Module({
  controllers: [AppController, BattleController],
  providers: [AppService, BattleService, HeroRepository],
})
export class AppModule {}
