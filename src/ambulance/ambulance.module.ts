import { Module } from '@nestjs/common';
import { AmbulanceService } from './ambulance.service';
import { AmbulanceController } from './ambulance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambulance } from './entity/ambulance.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { Hospital } from 'src/hospital/entity/hospital.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ambulance]),
    TypeOrmModule.forFeature([Hospital]),
  ],
  providers: [AmbulanceService],
  controllers: [AmbulanceController],
})
export class AmbulanceModule {}
