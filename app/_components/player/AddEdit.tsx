'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useAlertService, usePlayerService } from '_services';

export { AddEdit };

function AddEdit({ title, player }: { title: string, player?: any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const playerService = usePlayerService();
    const formattedPlayer = player ? { title: player.title, testBool: player.configuration.testBool } : undefined;

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: formattedPlayer });
    const { errors } = formState;

    const fields = {
        title: register('title', { required: 'Title is required' }),
        testBool: register('testBool'),
    };

    async function onSubmit(data: any) {
        alertService.clear();
        try {
            // create or update user based on user prop

            data = {
                title: data.title,
                configuration: {
                    testBool: data.testBool
                }
            }

            let message;
            if (player) {
                await playerService.update(player.id, data);
                message = 'Player updated';
            } else {
                await playerService.create(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{title}</h1>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Title</label>
                    <input {...fields.title} type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message?.toString()}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Configuration</label>
                    <input {...fields.testBool} type="checkbox" className={`form-control ${errors.testBool ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.testBool?.message?.toString()}</div>
                </div>
            </div>
            {/* <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">Username</label>
                    <input {...fields.username} type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">
                        Password
                        {user && <em className="ms-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                </div>
            </div> */}
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Save
                </button>
                <button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/players" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}