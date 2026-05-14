// src/routes/composite2.tsx

import { createFileRoute } from "@tanstack/react-router";
import { getCode } from "~/components/getCodeComposite2";

export const Route = createFileRoute("/composite2")({
    loader: () => getCode({ data: "src/components/getCodeComposite2.tsx" }),
    component: RouteComponent,
});

function RouteComponent() {
    const src = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>COMPOSITE 2</h3>
            {src}
        </div>
    );
}
