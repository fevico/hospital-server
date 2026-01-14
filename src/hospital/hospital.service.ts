import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from './entity/hospital.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}
  async findNearestAmbulance(hospitalId: number) {
    const nearest = await this.hospitalRepository
      .createQueryBuilder('a')
      .addSelect('ST_Distance(h.location, a.location)', 'distance')
      .innerJoin(Hospital, 'h', 'h.id = :hospitalId', { hospitalId })
      .orderBy('distance', 'ASC')
      .limit(1)
      .getRawOne();
  }
}
