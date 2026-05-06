// src/routes/with-suspense.tsx

import { createFileRoute } from "@tanstack/react-router";
import { getWithSuspense } from "~/components/getWithSuspense";

export const Route = createFileRoute("/with-suspense")({
    loader: () => getWithSuspense(),
    component: RouteComponent,
})

function RouteComponent() {
    const src = Route.useLoaderData();
    
    return <div className="p-2">{src}</div>;
}
