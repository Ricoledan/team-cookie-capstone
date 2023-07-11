'use client';

import { Card, Grid } from '@tremor/react';
import Form from "../form";

export default function ApplicationPage() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid numItemsSm={1} numItemsLg={1} className="gap-6">
                <div className="mt-6">
                        <Form />
                </div>
            </Grid>
        </main>
    );
}
