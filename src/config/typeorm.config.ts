import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const getDatabaseDataSourceOptions = ({
  port,
  host,
  username,
  database,
  schema,
  password,
}): DataSourceOptions => {
  return {
    type: 'postgres',
    port,
    host,
    username,
    database,
    schema,
    password: password,
    entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  };
};

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host:  'localhost',
//   port:  5444,
//   port:  5432,
//   username:  'postgres',
//   password:  'iamsmart',
//   database:  'savington-dev',
//   entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
//   synchronize: true,
//   autoLoadEntities: true
// };


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host:  '65.0.21.91',
  port:  5444,
  username:  'prod_admin',
  password:  'SavingTon@DB',
  database:  'savington-dev',
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  synchronize: true,
  autoLoadEntities: true
};

// This is used by TypeORM migration scripts
export const DatabaseSource = new DataSource(
{
  ...getDatabaseDataSourceOptions(typeOrmConfig as any),
});
