import clientPromise from "../lib/mongo";

export default function Car({ data }: any) {

    return (
        <div>
            {data.map((data: any) => (
                <li>
                    <h2>{data.title}</h2>
                    <h3>{data.description}</h3>
                </li>
            ))}
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const movies = await db
            .collection("tasks")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        return {
            props: { data: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
    }
}