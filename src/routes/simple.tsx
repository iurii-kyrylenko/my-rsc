// src/routes/simple.tsx

import { createFileRoute } from "@tanstack/react-router";
import { getCode } from "~/components/getCode";

export const Route = createFileRoute("/simple")({
    loader: async () => {
        const { Renderable } = await getCode();
        return { Code: Renderable };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { Code } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>SIMPLE</h3>
            <>{Code}</>
        </div>
    );
}
