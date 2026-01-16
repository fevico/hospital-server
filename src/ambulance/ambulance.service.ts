import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Ambulance } from './entity/ambulance.entity';
import { Hospital } from '../hospital/entity/hospital.entity';
import type { Point } from 'geojson';

@Injectable()
export class AmbulanceService {
  constructor(
    @InjectRepository(Ambulance)
    private ambulanceRepository: Repository<Ambulance>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @Inject(CACHE_MANAGER) private cacheManager: any,
  ) {}

  async findAll(): Promise<Ambulance[]> {
    return this.ambulanceRepository.find();
  }

  async updateLocation(
    id: number,
    lat: number,
    lng: number,
    status: string
  ): Promise<Ambulance> {
    const ambulance = await this.ambulanceRepository.findOneBy({ id });
    if (!ambulance) throw new Error('Ambulance not found');

    ambulance.location = this.createPoint(lng, lat);
    ambulance.status = status;
    return this.ambulanceRepository.save(ambulance);
  }

  async findNearestAmbulance(hospitalId: number): Promise<any> {
    const cacheKey = `nearest_ambulance_${hospitalId}`;
    let nearest = await this.cacheManager.get(cacheKey);
    if (nearest) return nearest;

    const hospital = await this.hospitalRepository.findOneBy({
      id: hospitalId,
    });
    if (!hospital) throw new Error('Hospital not found');

    // Important: hospital.location is already a Point, but we need to safely stringify it
    // Better to use parameters to avoid SQL injection risk and improve readability
    nearest = await this.ambulanceRepository
      .createQueryBuilder('a')
      .select('a.*')
      .addSelect(
        'ST_Distance(a.location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) / 1000',
        'distance_km',
      )
      .setParameters({
        lng: hospital.location.coordinates[0],
        lat: hospital.location.coordinates[1],
      })
      .orderBy('distance_km', 'ASC')
      .limit(1)
      .getRawOne();

    await this.cacheManager.set(cacheKey, nearest, 300); // Cache for 5 min
    return nearest;
  }

  // Seeding method
  async seedAmbulances() {
    const existing = await this.ambulanceRepository.count();
    if (existing > 0) return;

    const ambulances = [
      {
        name: 'AMB-001',
        status: 'available',
        location: this.createPoint(3.37, 6.6), // Near Ikeja
      },
      {
        name: 'AMB-002',
        status: 'available',
        location: this.createPoint(3.425, 6.44), // Victoria Island
      },
      {
        name: 'AMB-003',
        status: 'in-use',
        location: this.createPoint(3.385, 6.555), // Gbagada
      },
      {
        name: 'AMB-004',
        status: 'available',
        location: this.createPoint(3.41, 6.455), // Obalende
      },
      {
        name: 'AMB-005',
        status: 'maintenance',
        location: this.createPoint(3.365, 6.495), // Surulere
      },
    ];

    await this.ambulanceRepository.save(ambulances);
  }

  private createPoint(lng: number, lat: number): Point {
    return { type: 'Point' as const, coordinates: [lng, lat] };
  }
}
