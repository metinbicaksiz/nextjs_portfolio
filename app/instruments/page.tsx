import { createClient } from '@/utils/supabase/server';

export default async function Instruments() {
    const supabase = await createClient();
    const { data: instruments } = await supabase.from("instruments").select();

    return (
        <>
            <main>
                <div>
                    {instruments?.map((instrument) => (
                        <ul>
                            <li>{instrument.name}</li>
                        </ul>
                    ))}
                </div>
                {/*<pre>{JSON.stringify(instruments, null, 2)}</pre>*/}
            </main>
        </>
        )
}