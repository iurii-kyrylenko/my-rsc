// src/routes/defer.tsx

import { Await, createFileRoute } from "@tanstack/react-router";
import { CompositeComponent } from "@tanstack/react-start/rsc";
import { Suspense, use } from "react";
import { getCode } from "~/components/getCode";

export const Route = createFileRoute("/defer")({
    loader: () => ({ codePromise: getCode({ data: "src/routes/defer.tsx" }) }),
    component: RouteComponent,
});

function RouteComponent() {
    const { codePromise } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>DEFER</h3>

            <Suspense fallback={<div>Loading...</div>}>
                <Await promise={codePromise}>
                    {/* {({ src }) => <CompositeComponent src={src} />} */}
                    {({ src }) => src}
                </Await>
                {/* <Deferred promise={codePromise} /> */}
            </Suspense>
        </div>
    );
}

function Deferred({ promise }: { promise: ReturnType<typeof getCode> }) {
    const { src } = use(promise);
    // return <CompositeComponent src = {src} />;
    return src;
}
