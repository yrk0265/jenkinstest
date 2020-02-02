import amqp from 'amqplib/callback_api';
const CONN_URL = 'amqp://kkuplzcx:3nffY3Ueerlv7D8hl0oCePJMP2EQb6a2@orangutan.rmq.cloudamqp.com/kkuplzcx';
let ch = null;
amqp.connect(CONN_URL+ "?heartbeat=60", function (err, conn) {
    if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(start, 1000);
    }
    conn.createChannel(function (err, channel) {
       ch = channel;
    });
 });
 export const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(data));
 }
 process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
 });
