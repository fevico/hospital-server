import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entity/hospital.entity';
import type { Point } from 'geojson';  // consistent with entity

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
  ) {}

  async findAll(): Promise<Hospital[]> {
    return this.hospitalRepository.find();
  }

  private createPoint(lng: number, lat: number): Point {
    return { type: 'Point' as const, coordinates: [lng, lat] };
  }

  async seedHospitals() {
    const existing = await this.hospitalRepository.count();
    if (existing > 0) return;

    const hospitals = [
      { 
        name: 'Lagos University Teaching Hospital', 
        address: 'Idi-Araba, Lagos', 
        capacity: 800, 
        type: 'Teaching', 
        location: this.createPoint(3.3535, 6.5190) 
      },
      { 
        name: 'Ikeja General Hospital', 
        address: 'Mobolaji Bank Anthony Way, Ikeja', 
        capacity: 300, 
        type: 'General', 
        location: this.createPoint(3.3658, 6.5970) 
      },
      { 
        name: 'Eko Hospital', 
        address: 'Mobolaji Bank Anthony Way, Ikeja', 
        capacity: 200, 
        type: 'Private', 
        location: this.createPoint(3.3667, 6.5960) 
      },
      { 
        name: 'St. Nicholas Hospital', 
        address: 'Victoria Island, Lagos', 
        capacity: 150, 
        type: 'Specialist', 
        location: this.createPoint(3.4260, 6.4380) 
      },
      { 
        name: 'Reddington Hospital', 
        address: 'Victoria Island, Lagos', 
        capacity: 120, 
        type: 'Private', 
        location: this.createPoint(3.4270, 6.4390) 
      },
      { 
        name: 'Gbagada General Hospital', 
        address: 'Gbagada, Lagos', 
        capacity: 250, 
        type: 'General', 
        location: this.createPoint(3.3880, 6.5500) 
      },
      { 
        name: 'LASUTH Annex', 
        address: 'Ikeja, Lagos', 
        capacity: 400, 
        type: 'Teaching', 
        location: this.createPoint(3.3670, 6.5980) 
      },
      { 
        name: 'First Consultant Hospital', 
        address: 'Obalende, Lagos', 
        capacity: 100, 
        type: 'Private', 
        location: this.createPoint(3.4070, 6.4500) 
      },
      { 
        name: 'Military Hospital', 
        address: 'Yaba, Lagos', 
        capacity: 200, 
        type: 'Military', 
        location: this.createPoint(3.3800, 6.5100) 
      },
      { 
        name: 'Randle General Hospital', 
        address: 'Surulere, Lagos', 
        capacity: 180, 
        type: 'General', 
        location: this.createPoint(3.3600, 6.4900) 
      },
    ];

    await this.hospitalRepository.save(hospitals);
  }
}