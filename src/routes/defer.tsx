// src/routes/defer.tsx

import { Await, createFileRoute } from "@tanstack/react-router";
import { Suspense, use } from "react";
import { getCode } from "~/components/getCode";

export const Route = createFileRoute("/defer")({
    loader: async () => {
        return { codePromise: getCode() };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { codePromise } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>DEFER</h3>

            <Suspense fallback={<div>Loading...</div>}>
                <Await promise={codePromise}>
                    {({ Renderable }) => Renderable}
                </Await>
                {/* <Deferred promise={codePromise} /> */}
            </Suspense>
        </div>
    );
}

function Deferred({ promise }: { promise: ReturnType<typeof getCode> }) {
    const { Renderable } = use(promise);
    return Renderable;
}
