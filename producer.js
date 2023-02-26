import { Kafka } from "kafkajs";
import {randomUUID} from 'node:crypto';

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'notifications',
        brokers: ['flowing-dogfish-11184-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'Zmxvd2luZy1kb2dmaXNoLTExMTg0JEawv9_JSsWMAVaNAGib-6XAHbQBH6cU-1s',
          password: '8b4ab91e2eb747238dda9f9c4345f6eb',
        },
        ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            { value: JSON.stringify({
                content: 'Nova solicitação de amizade!',
                category: 'social',
                recipientId: randomUUID(),

            }) },
            
        ],
    })

    await producer.disconnect();
}

bootstrap();