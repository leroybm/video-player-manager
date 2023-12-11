import joi from 'joi';

import { playersRepo } from 'helpers/server';
import { apiHandler } from 'helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await playersRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await playersRepo.create(body);
}

create.schema = joi.object({
    title: joi.string().required(),
    configuration: joi.object().required(),
    videoUrl: joi.string().required(),
});