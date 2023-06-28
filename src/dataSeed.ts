import { createConnection, ConnectionOptions } from 'typeorm';
import { Item } from './entities/Item';
import { Event, Location } from './entities/Event';

const jsonData = {
  items: [
    {
      name: 'Item 1',
      colour: 'Red',
      price: 10,
    },
    {
      name: 'Item 2',
      colour: 'Blue',
      price: 20,
    },
    {
      name: 'Item 3',
      colour: 'Green',
      price: 15,
    },
  ],
  events: [
    {
      itemId: 1,
      name: 'Event A',
      location: Location.Supplier,
      custodian: 'John Doe',
    },
    {
      itemId: 1,
      name: 'Event B',
      location: Location.Manufacturer,
      custodian: 'Joseph Hill',
    },
    {
      itemId: 2,
      name: 'Event A',
      location: Location.Supplier,
      custodian: 'Nancy Dan',
    },
    {
      itemId: 2,
      name: 'Event B',
      location: Location.Manufacturer,
      custodian: 'Micheal Smith',
    },
    {
      itemId: 2,
      name: 'Event C',
      location: Location.Distributor,
      custodian: 'Mercy Johnson',
    },
    {
      itemId: 2,
      name: 'Event D',
      location: Location.Retailer,
      custodian: 'Jane Doe',
    },
    {
      itemId: 2,
      name: 'Event E',
      location: Location.Customer,
      custodian: 'Raymond Redington',
    },
  ],
};

const connectDatabase = async () => {
  try {
    const connectionOptions: ConnectionOptions = {
      type: 'postgres',
      host: process.env.DB_HOST || 'database',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'supply_chain_usr',
      password: process.env.DB_PASSWORD || '@supply_chain_trace_usr23!',
      database: process.env.DB_DATABASE || 'supply_chain_track',
      entities: [Item, Event],
      synchronize: true,
    };

    const connection = await createConnection(connectionOptions);
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('TypeORM connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    const connection = await connectDatabase();

    // Get the necessary repositories/entities from TypeORM to save the data
    const itemRepository = connection.getRepository(Item);
    const eventRepository = connection.getRepository(Event);

    // Iterate through the items and save them to the database
    for (const itemData of jsonData.items) {
      const item = new Item();
      item.name = itemData.name;
      item.colour = itemData.colour;
      item.price = itemData.price;

      await itemRepository.save(item);
    }

    // Iterate through the events and save them to the database
    for (const eventData of jsonData.events) {
      const event = new Event();
      event.item = new Item(); // Create a new Item object
      event.item.id = eventData.itemId;
      event.name = eventData.name;
      event.location = eventData.location;
      event.custodian = eventData.custodian;

      await eventRepository.save(event);
    }

    console.log('Data seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Data seeding error:', error);
    process.exit(1);
  }
};

seedData();
