import { createServer } from 'http'
import { createYoga } from 'graphql-yoga';
import { schema } from '../../../commons/schema';

const yoga = createYoga({
  schema,
  healthCheckEndpoint: '/live'
})

const server = createServer(yoga)
server.listen(4001, () => {
  console.info('Server is running on http://localhost:4001/graphql')
})