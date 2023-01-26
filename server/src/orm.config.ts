import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });

const commonConf = {
  SYNCRONIZE: true,
  ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations',
  },
  MIGRATIONS_RUN: true,
};

const ormconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  database: process.env.DB_NAME,
  url: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_NAME}`,
  logging: false,
  synchronize: commonConf.SYNCRONIZE,
  entities: commonConf.ENTITIES,
  migrations: commonConf.MIGRATIONS,
  cli: commonConf.CLI,
  migrationsRun: commonConf.MIGRATIONS_RUN,
  autoLoadEntities: true,
};

export default ormconfig;
