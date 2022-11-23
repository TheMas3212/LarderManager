import { Router } from "express";
import * as express from 'express';
import items from "./items";
import lists from "./lists";

const api = Router({
  caseSensitive: true, 
  strict: true
});

api.use(express.json());
api.use('/items', items);
api.use('/lists', lists);

export default api;