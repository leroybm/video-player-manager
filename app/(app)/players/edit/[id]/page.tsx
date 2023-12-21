'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayerService } from '@/services/index';
import { AddEdit } from '@/components/player';

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