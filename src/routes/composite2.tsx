// src/routes/composite2.tsx

import { createFileRoute } from "@tanstack/react-router";
import { CompositeComponent } from "@tanstack/react-start/rsc";
import { getCode } from "~/components/getCodeComposite2";

export const Route = createFileRoute("/composite2")({
    loader: async () => {
        const { src } = await getCode({ data: "src/components/getCodeComposite2.tsx" });
        return { src };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { src } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>COMPOSITE 2</h3>
           <>{src}</>
        </div>
    );
}
