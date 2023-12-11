'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { usePlayerService } from 'services';

export default function Players() {
    const playerService = usePlayerService();
    const players = playerService.players;

    useEffect(() => {
        playerService.getAll();
    }, []);

    return (
        <>
            <h1>Video Players Pass</h1>
            <Link href="/players/add">Create New</Link>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Title</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody />
                </tbody>
            </table>
        </>
    );

    function TableBody() {
        if (players?.length) {
            return (players.map(player =>
                <tr key={player.id}>
                    <td>{player.title}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/players/edit/${player.id}`}>Edit</Link>
                        <button onClick={() => playerService.delete(player.id)} style={{ width: '60px' }} disabled={player.isDeleting}>
                            {player.isDeleting
                                ? <span>Spinner</span>
                                : <span>Delete</span>
                            }
                        </button>
                    </td>
                </tr>
            ));
        }

        if (!players) {
            return (
                <tr>
                    <td colSpan={4}>
                        <span>Spinner</span>
                    </td>
                </tr>
            );
        }

        if (players?.length === 0) {
            return (
                <tr>
                    <td colSpan={4}>
                        <div>No Players To Display</div>
                    </td>
                </tr>
            );
        }
    }
}