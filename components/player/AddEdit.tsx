'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useAlertService, usePlayerService } from '../../services';
import { FluidPlayerConfigurator } from '../../components/FluidPlayerConfigurator';
import { useState } from 'react';
import { ConfiguratorOptions } from '../../models';

export { AddEdit };

function AddEdit({ title, player }: { title: string, player?: any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const playerService = usePlayerService();
    const [currentPlayer, setCurrentPlayer] = useState<ConfiguratorOptions>(player);

    // get functions to build form with useForm() hook

    async function onSubmit() {
        alertService.clear();
        try {
            // create or update user based on user prop

            let message;
            if (player) {
                await playerService.update(player.id, currentPlayer as any);
                message = 'Player updated';
            } else {
                await playerService.create(currentPlayer as any);
                message = 'Player added';
            }

            // redirect to user list with success message
            router.push('/players');
            alertService.success(message, true);
        } catch (error: any) {
            alertService.error(error);
        }
    }

    return (
        <div className="container mx-auto max-h-screen min-h-screen grid grid-rows-[50px_1fr_50px] gap-2">
            <h1 className="my-3 text-xl">{title}</h1>
            <FluidPlayerConfigurator 
                configuration={currentPlayer}
                onSave={(data) => {
                    console.log('saving ass', { ...currentPlayer, ...data });
                    return setCurrentPlayer({ ...currentPlayer, ...data });
                }}
            />
            <div className="flex justify-end items-center gap-2 pb-4">
                <Link href="/players" className="rounded bg-gray-200 text-gray-800 px-3 py-1">Cancel</Link>
                <button type="button" className="rounded bg-gray-200 text-gray-800 px-3 py-1 cursor-not-allowed">
                    Preview
                </button>
                <button type="button" className="rounded bg-gray-200 text-gray-800 px-3 py-1 cursor-not-allowed">
                    Embed
                </button>
                <button type="button" className="rounded bg-green-500 text-gray-100 px-3 py-1" onClick={onSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}