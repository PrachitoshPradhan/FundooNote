import {redisClient } from '../config/redis';
import HttpStatus from 'http-status-codes';

export const getAllNotesRedis = async (req, res, next) => {

    const data = await redisClient.get("userId");
    // JSON.parse will convert the json string we have set with key in redis db back to json obj 
        const notes = JSON.parse(data);
        if (notes) {
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: notes,
                message: 'All notes fetched from redis'
            });
        }
    next();
};

export const getNotesByIdRedis = async (req, res, next) => {

    const data = await redisClient.get("noteId");
    
    
        const notes = JSON.parse(data);
      
        if (notes) {
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: notes,
                message: 'Single note fetched from redis'
            });
        }
    next();
};