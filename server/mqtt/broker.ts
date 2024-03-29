import Aedes from 'aedes';
import type { Server } from 'net';
import { createServer } from 'net';

const rawPort: string | undefined = process.env.LOCAL_BROKER_PORT;
const port: number = rawPort === undefined ? 1883 : parseInt(rawPort);
const aedes: Aedes = new Aedes();
const server: Server = createServer(aedes.handle);

server.listen(port, function () {
  console.log('MQTT Broker start at port:', port);
});
