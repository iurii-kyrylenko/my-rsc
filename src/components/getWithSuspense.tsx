// src/components/getWithSuspense.tsx

import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import { Suspense } from "react";

async function Srv(props: { data: string, delay: number }) {
    await new Promise((resolve) => setTimeout(resolve, props.delay));
    return (
        <div>{props.data}</div>
    );
}

function Fallback() {
    return <div>Loading...</div>;
}

export const getWithSuspense = createServerFn()
    .handler(() =>
        renderServerComponent(
            <div className="flex flex-col gap-2">
                <Suspense fallback={<Fallback />}>
                    <Srv data="3000" delay={3000} />
                </Suspense >
                <Suspense fallback={<Fallback />}>
                    <Srv data="1000" delay={1000} />
                </Suspense>
                <Suspense fallback={<Fallback />}>
                    <Srv data="2000" delay={2000} />
                </Suspense>
            </div>
        ));
