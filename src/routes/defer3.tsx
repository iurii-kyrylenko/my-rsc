// src/routes/defer3.tsx

import { createFileRoute } from "@tanstack/react-router";
import { JSX, Suspense, use } from "react";
import { getDeferred3 } from "~/components/getDeferred3";

export const Route = createFileRoute("/defer3")({
    loader: () => getDeferred3(),
    component: RouteComponent,
})

function Fallback() {
    return <div>Loading...</div>;
}

function Deferred(props: { promise: Promise<JSX.Element> }) {
    const comp = use(props.promise);
    return <>{comp}</>;
}

function RouteComponent() {
    const { cp1, cp2, cp3 } = Route.useLoaderData();
    return (
        <div className="p-2 flex flex-col gap-2">
            <Suspense fallback={<Fallback />}>
                <Deferred promise={cp1} />
            </Suspense>
            <Suspense fallback={<Fallback />}>
                <Deferred promise={cp2} />
            </Suspense>
            <Suspense fallback={<Fallback />}>
                <Deferred promise={cp3} />
            </Suspense>
        </div>
    );
}
