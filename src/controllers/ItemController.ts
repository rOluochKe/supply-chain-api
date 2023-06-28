import { Request, Response } from 'express';
import { getRepository, OrderByCondition } from 'typeorm';
import { Item } from '../entities/Item';
import { Event } from '../entities/Event';
import { validateObject, extractValidationErrors } from '../util/validator';

class ItemController {
  // Create a new supply chain item
  async createItem(req: Request, res: Response) {
    try {
      const itemRepository = getRepository(Item);
      const newItem = itemRepository.create(req.body);

      // Validate the newItem object
      const errors = await validateObject(newItem);
      if (errors.length > 0) {
        const errorMessages = extractValidationErrors(errors);
        return res.status(400).json({ errors: errorMessages });
      }

      await itemRepository.save(newItem);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create item' });
    }
  }

  // Query all items
  async getAllItems(req: Request, res: Response) {
    try {
      const itemRepository = getRepository(Item);
      const items = await itemRepository.find({
        order: { id: 'DESC' } as OrderByCondition,
      });

      res.json(items);
    } catch (error) {
      console.error('Error retrieving items:', error);
      res.status(500).json({ error: 'Failed to retrieve items' });
    }
  }

  // Get a specific item by ID
  async getItem(req: Request, res: Response) {
    try {
      const itemRepository = getRepository(Item);
      const itemId = req.params.itemId;
      const item = await itemRepository.findOne(itemId);

      if (!item) {
        return res.status(404).json({ error: 'No events found for the item' });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get item' });
    }
  }

  // Update supply chain item reference data
  async updateItem(req: Request, res: Response) {
    try {
      const itemRepository = getRepository(Item);
      const item = await itemRepository.findOne(req.params.itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      itemRepository.merge(item, req.body);

      // Validate the item object
      const errors = await validateObject(item);
      if (errors.length > 0) {
        const errorMessages = extractValidationErrors(errors);
        return res.status(400).json({ errors: errorMessages });
      }

      await itemRepository.save(item);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item' });
    }
  }

  // Add new events associated with an item
  async addEvent(req: Request, res: Response) {
    try {
      const eventRepository = getRepository(Event);
      const itemRepository = getRepository(Item);
      const item = await itemRepository.findOne(req.params.itemId);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      const newEvent = eventRepository.create({
        ...req.body,
        item: item, // Assign the item to the newEvent
      });

      // Validate the newEvent object
      const errors = await validateObject(newEvent);
      if (errors.length > 0) {
        const errorMessages = extractValidationErrors(errors);
        return res.status(400).json({ errors: errorMessages });
      }

      await eventRepository.save(newEvent);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add event' });
    }
  }

  // Query all events of an item
  async getAllEvents(req: Request, res: Response) {
    try {
      const eventRepository = getRepository(Event);
      const events = await eventRepository.find({
        where: { item: req.params.itemId },
        order: { id: 'DESC' } as OrderByCondition,
      });
      res.json(events);
    } catch (error) {
      console.error('Error retrieving events:', error);
      res.status(500).json({ error: 'Failed to retrieve events' });
    }
  }

  // Get the last event of an item
  async getLastEvent(req: Request, res: Response) {
    try {
      const eventRepository = getRepository(Event);
      const itemId = req.params.itemId;

      const lastEvent = await eventRepository.findOne({
        where: { item: itemId },
        order: { timestamp: 'DESC' },
      });

      if (!lastEvent) {
        return res.status(404).json({ error: 'No events found for the item' });
      }

      res.json(lastEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get last event' });
    }
  }
}

export default ItemController;
