import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattleController } from 'battle/battle.controller';
import { BattleService } from 'battle/battle.service';

@Module({
  imports: [],
  controllers: [AppController, BattleController],
  providers: [AppService, BattleService],
})
export class AppModule {}
