import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalModule } from './hospital/hospital.module';
import { AmbulanceModule } from './ambulance/ambulance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl:
          configService.get('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        autoLoadEntities: true,
        synchronize: true, // true for dev only! Use migrations in prod
        logging: ['query', 'error'], // helpful for debugging spatial queries
        extra: {
          ssl: { rejectUnauthorized: false },
        },
      }),
      inject: [ConfigService],
    }),
    HospitalModule,
    AmbulanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
