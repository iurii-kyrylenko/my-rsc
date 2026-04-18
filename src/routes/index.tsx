// src/routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { getCode } from "~/components/getCode";

export const Route = createFileRoute("/")({
    loader: async () => {
        const { Renderable } = await getCode();
        return { Code: Renderable };
    },
    component: Home,
});

function Home() {
    const { Code } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>Welcome Home!!!</h3>
            <>{Code}</>
        </div>
    );
}
