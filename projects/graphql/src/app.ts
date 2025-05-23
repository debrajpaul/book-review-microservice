import { createServer } from 'http'
import { createYoga } from 'graphql-yoga';
import 'dotenv/config';
import { schema } from '../../../commons/schema';
import { connectToMongo } from '../../../commons/stores/src/connect';

const yoga = createYoga({
  schema,
  healthCheckEndpoint: '/live'
})
connectToMongo()
const server = createServer(yoga)
server.listen(4002, () => {
  console.info('Server is running on http://localhost:4002/graphql')
})