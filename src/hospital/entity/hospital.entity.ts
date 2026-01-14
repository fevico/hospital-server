import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Point } from 'geojson'; // from @types/geojson

@Entity('hospitals') // table name
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'geometry',               // or 'geography' if you prefer (meters-based)
    spatialFeatureType: 'Point',    // restricts to Point only
    srid: 4326,                     // standard GPS coord system (WGS84)
    nullable: false,
  })
  @Index({ spatial: true })         // creates GIST index → very important for fast spatial queries!
  location: Point;                  // TypeScript type: { type: 'Point', coordinates: [lng, lat] }
}