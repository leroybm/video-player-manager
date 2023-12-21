import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '@/helpers/server/api';
import { playersRepo } from '@/helpers/server';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {
    return await playersRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await playersRepo.update(id, body);
}

update.schema = joi.object({
    title: joi.string(),
    playerConfiguration: joi.object(),
    sources: joi.array().items(joi.object().keys({
        label: joi.string(),
        url: joi.string(),
    }))
});

async function _delete(req: Request, { params: { id } }: any) {
    await playersRepo.delete(id);
}
