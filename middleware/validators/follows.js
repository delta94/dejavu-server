const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const createError = require('http-errors');
const debug = require('debug')('dejavu-server:follows');

module.exports = {
    followers: (req, res, next) => {
        const { id: userId } = req.params;
        const schema = Joi.objectId();
        const { error } = schema.validate(userId);
        if (error) {
            debug(error.details[0].message);
            return next(createError(400));
        }
        let {
            page = '1',
            limit = '25'
        } = req.query;
        page = Number.parseInt(page);
        limit = Number.parseInt(limit);
        if (isNaN(page) || isNaN(limit)) return next(createError(400));
        req.query.page = page;
        req.query.limit = limit;
        next();
    },
    followings: (req, res, next) => {
        const { id: userId } = req.params;
        const schema = Joi.objectId();
        const { error } = schema.validate(userId);
        if (error) {
            debug(error.details[0].message);
            return next(createError(400));
        }
        let {
            page = '1',
            limit = '25'
        } = req.query;
        page = Number.parseInt(page);
        limit = Number.parseInt(limit);
        if (isNaN(page) || isNaN(limit)) return next(createError(400));
        req.query.page = page;
        req.query.limit = limit;
        next();
    },
    follow: (req, res, next) => {
        const schema = Joi.object({
            followedId: Joi.objectId().required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            debug(error.details[0].message);
            next(createError(400));
        }
        else next()
    },
    unfollow: (req, res, next) => {
        const { id: userId } = req.params;
        const schema = Joi.objectId();
        const { error } = schema.validate(userId);
        if (error) {
            debug(error.details[0].message);
            next(createError(400));
        }
        else next();
    },
    numOfFollower: (req, res, next) => {
        const { id: userId } = req.params;
        const schema = Joi.objectId();
        const { error } = schema.validate(userId);
        if (error) {
            debug(error.details[0].message);
            next(createError(400));
        }
        else next();
    },
    numOfFollowing: (req, res, next) => {
        const { id: userId } = req.params;
        const schema = Joi.objectId();
        const { error } = schema.validate(userId);
        if (error) {
            debug(error.details[0].message);
            next(createError(400));
        }
        else next();
    }
}