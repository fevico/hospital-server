import { Controller, Get, Put, Param, Body, OnModuleInit } from '@nestjs/common';
import { AmbulanceService } from './ambulance.service';

@Controller('ambulances')
export class AmbulanceController implements OnModuleInit {
  constructor(private ambulanceService: AmbulanceService) {}

  async onModuleInit() {
    await this.ambulanceService.seedAmbulances();
  }

  @Get()
  findAll() {
    return this.ambulanceService.findAll();
  }

  @Put(':id/location')
  updateLocation(@Param('id') id: number, @Body() { lat, lng }: { lat: number; lng: number }) {
    return this.ambulanceService.updateLocation(id, lat, lng);
  }

  @Get('nearest/:hospitalId')
  findNearest(@Param('hospitalId') hospitalId: number) {
    return this.ambulanceService.findNearestAmbulance(hospitalId);
  }
}