'use client';

import { client } from '@/app/utils/client';

export default function Home() {
    const handleClick = async () => {
        const res = await client.api.users.$get({});
        alert(res.json());
    };
    return (
        <div>
            <button type='button' onClick={handleClick}>
                Click me
            </button>
        </div>
    );
}
