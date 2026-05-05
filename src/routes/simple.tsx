// src/routes/simple.tsx

import { createFileRoute } from "@tanstack/react-router";
import { CompositeComponent } from "@tanstack/react-start/rsc";
import { getCode } from "~/components/getCode";

export const Route = createFileRoute("/simple")({
    loader: () => getCode({ data: "src/components/getCode.tsx" }),
    component: RouteComponent,
});

function RouteComponent() {
    const { src } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>SIMPLE</h3>
            {/* <CompositeComponent src={src} /> */}
            <>{src}</>
        </div>
    );
}
