import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattleController } from './battle/battle.controller';
import { BattleService } from './battle/battle.service';
import { HeroRepository } from './battle/hero.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleModule } from 'battle/battle.module';

@Module({
  imports : [MongooseModule.forRoot('mongodb://localhost:27017/heroes'), BattleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
