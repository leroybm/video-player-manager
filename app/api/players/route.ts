import joi from 'joi';

import { playersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await playersRepo.getAll();
}

async function create(req: Request) {
    console.log('interacting with repo');
    const body = await req.json();
    await playersRepo.create(body);
}

create.schema = joi.object({
    title: joi.string().required(),
    configuration: joi.object().required(),
});