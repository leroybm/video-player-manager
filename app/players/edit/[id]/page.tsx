'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AddEdit } from '_components/player';
import { usePlayerService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const playerService = usePlayerService();
    const player = playerService.player;

    useEffect(() => {
        if (!id) return;

        // fetch user for add/edit form
        playerService.getById(id);
    }, [router]);

    return player
        ? <AddEdit title="Edit Player" player={player} />
        : <span>Spinner</span>;
}