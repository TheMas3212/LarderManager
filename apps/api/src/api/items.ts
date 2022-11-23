import { APIErrorResponse, CreateItemRequest, CreateItemResponse, DeleteItemRequest, DeleteItemResponse, RetrieveItemRequest, RetrieveItemResponse, UpdateItemRequest, UpdateItemResponse } from "@larder/api-interfaces";
import { NextFunction, Request, Response, Router } from "express";
import Database from "../orm";
import { Item } from "../orm/entity/Item";
import { TypedRequestBody, TypedResponse } from "../expressTypes";

const Items = Database.getRepository(Item);

const items = Router({
  caseSensitive: true, 
  strict: true
});

function getItem(req: Request, res: Response, next: NextFunction) {
  Items.findOne({
    where: { id: req.params.id }
  }).then((item) => {
    req['item'] = item;
    return next();
  }).catch(() => {
    res.status(404).json({ error: 'Not Found' }).end();
  })

}

items.post('/create', (req: TypedRequestBody<CreateItemRequest>, res: TypedResponse<CreateItemResponse | APIErrorResponse>) => {
  console.log(req.body)
  if (typeof req.body.name !== 'string') return res.status(400).json({ error: 'Invalid Data: name' }).end();
  if (typeof req.body.category !== 'string') return res.status(400).json({ error: 'Invalid Data: category' }).end();
  if (typeof req.body.stock !== 'number') return res.status(400).json({ error: 'Invalid Data: stock' }).end();
  if (typeof req.body.target !== 'number') return res.status(400).json({ error: 'Invalid Data: target' }).end();
  Items.insert({
    name: req.body.name,
    category: req.body.category,
    stock: req.body.stock,
    target: req.body.target
  }).then((ir) => {
    return res.status(201).json({ id: ir.identifiers[0].id }).end();
  }).catch((err) => {
    console.error('insert error', err);
    return res.status(500).json({ error: 'Unknown error' }).end();
  })
});
items.get('/:id', getItem, (req: TypedRequestBody<RetrieveItemRequest>, res: TypedResponse<RetrieveItemResponse | APIErrorResponse>) => {
  res.status(200).json({ item: req['item'] as Item }).end();
});
items.post('/:id', getItem, (req: TypedRequestBody<UpdateItemRequest>, res: TypedResponse<UpdateItemResponse | APIErrorResponse>) => {
  const item: Item = req['item'];
  if (req.body.name) item.name = req.body.name;
  if (req.body.category) item.category = req.body.category;
  if (req.body.stock) item.stock = req.body.stock;
  if (req.body.target) item.target = req.body.target;
  Items.save(item).then(() => {
    return res.status(200).end();
  }).catch((err) => {
    console.error('update error', err);
    res.status(500).json({ error: 'Unknown error' }).end();

  });
})
items.delete('/:id', getItem, (req: TypedRequestBody<DeleteItemRequest>, res: TypedResponse<DeleteItemResponse | APIErrorResponse>) => {
  Items.remove(req['item'] as Item).then(() => {
    res.status(200).end();
  }).catch(err => {
    console.error('delete error', err);
    res.status(500).json({ error: 'Unknown error' }).end();
  })
});

export default items;