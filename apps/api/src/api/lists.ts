import { Router } from "express";
import Database from "../orm";
import { Item } from "../orm/entity/Item";

const Items = Database.getRepository(Item);

const lists = Router({
  caseSensitive: true, 
  strict: true
});

lists.get('/shopping', (req, res) => {
  Items.find().then((items) => {
    const list = items.filter(item => item.stock < item.target)
    return res.status(200).json({
      items: list, count: list.length
    }).end();
  }).catch((err) => {
    console.error('shopping list error', err);
    res.status(500).json({ error: 'Unknown error' }).end();
  })
});
lists.get('/overstock', (req, res) => {
  Items.find().then((items) => {
    const list = items.filter(item => item.stock > item.target)
    return res.status(200).json({
      items: list, count: list.length
    }).end();
  }).catch((err) => {
    console.error('overstock list error', err);
    res.status(500).json({ error: 'Unknown error' }).end();
  })
});
lists.get('/all', (req, res) => {
  Items.find().then((items) => {
    return res.status(200).json({
      items: items, count: items.length
    }).end();
  }).catch((err) => {
    console.error('all list error', err);
    res.status(500).json({ error: 'Unknown error' }).end();
  })

})

export default lists;