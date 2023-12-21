import { headers } from 'next/headers';
import { db } from './db';
import { ObjectId } from 'mongodb';

const Player = db.VideoPlayer;

export const playersRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Player.find();
}

async function getById(id: string) {
    try {
        return await Player.findById(id);
    } catch {
        throw 'Player Not Found';
    }
}

async function create(params: any) {
    // validate
    if (await Player.findOne({ title: params.title })) {
        throw 'Player "' + params.title + '" is already taken';
    }

    const player = new Player(params);

    await player.save();
}

async function update(id: string, params: any) {
    const player = await Player.findById(id);

    // validate
    if (!player) throw 'Player not found';
    if (player.title !== params.title && await Player.findOne({ title: params.title })) {
        throw 'Title "' + params.title + '" is already taken';
    }

    // copy params properties to user
    Object.assign(player, params);

    await player.save();
}

async function _delete(id: string) {
    await Player.findOneAndDelete({ _id: new ObjectId(id) });
}
