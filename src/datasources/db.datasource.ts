// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'postgresql',
  url: 'postgres://dcynwiafqmnfnt:a4d2532227977974ed2af794cc5c54be6c86b7347b95e95f8042ab06a1ea83ef@ec2-176-34-211-0.eu-west-1.compute.amazonaws.com:5432/d789sai80jjqn?ssl=true',
  host: 'ec2-176-34-211-0.eu-west-1.compute.amazonaws.com',
  port: 5432,
  user: 'dcynwiafqmnfnt',
  password: 'a4d2532227977974ed2af794cc5c54be6c86b7347b95e95f8042ab06a1ea83ef',
  database: 'd789sai80jjqn',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
