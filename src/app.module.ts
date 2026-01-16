import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalModule } from './hospital/hospital.module';
import { AmbulanceModule } from './ambulance/ambulance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],       
      inject: [ConfigService],
      useFactory: async (config?: ConfigService) => ({
        // Use the awaited factory version
        store: await redisStore({
          host: 'localhost',
          port: 6379,
          // ttl: 300, // seconds
        }),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: configService.get('DB_SSL') === 'true' 
          ? { rejectUnauthorized: false } 
          : false,
        autoLoadEntities: true,
        synchronize: true, // dev only
        logging: ['query', 'error'],
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