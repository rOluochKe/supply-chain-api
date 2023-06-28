import express from 'express';
import ItemController from '../controllers/ItemController';

const router = express.Router();
const itemController = new ItemController();

// Create a new supply chain item
router.post('/items', itemController.createItem);

// Query all items of supply chain
router.get('/items', itemController.getAllItems);

// Get a specific item by ID
router.get('/items/:itemId', itemController.getItem);

// Update supply chain item reference data
router.put('/items/:itemId', itemController.updateItem);

// Add new events associated with an item
router.post('/items/:itemId/events', itemController.addEvent);

// Query all events of an item
router.get('/items/:itemId/events', itemController.getAllEvents);

// Get the last event of an item
router.get('/items/:itemId/last-event', itemController.getLastEvent);

export default router;
