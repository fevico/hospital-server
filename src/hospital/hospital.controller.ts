import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { HospitalService } from './hospital.service';

@Controller('hospitals')
export class HospitalController implements OnModuleInit {
  constructor(private hospitalService: HospitalService) {}
 
  async onModuleInit() {
    await this.hospitalService.seedHospitals(); // Seed on app start
  }

  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }
}