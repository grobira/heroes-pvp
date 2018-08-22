import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleModule } from 'battle/battle.module';

@Module({
  imports : [MongooseModule.forRoot('mongodb://localhost:27017/heroes'), BattleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
