import { getAllInstruments } from '@/lib/database';

export default async function Instruments() {
    const instruments = await getAllInstruments();

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