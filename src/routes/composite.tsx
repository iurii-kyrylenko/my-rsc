// src/routes/composite.tsx

import { createFileRoute } from "@tanstack/react-router";
import { CompositeComponent } from "@tanstack/react-start/rsc";
import { getCode } from "~/components/getCodeComposite";

export const Route = createFileRoute("/composite")({
    loader: async () => {
        const { src } = await getCode({ data: "src/components/getCodeComposite.tsx" });
        return { src };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { src } = Route.useLoaderData();

    return (
        <div className="p-2">
            <h3>COMPOSITE</h3>
            <CompositeComponent
                src={src}
                copyButton={({ textToCopy }) => (
                    <button
                        className="text-white bg-blue-500 hover:bg-blue-400 size-16 rounded-full"
                        onClick={async () => {
                            await navigator.clipboard?.writeText(textToCopy);
                        }}
                    >
                        {textToCopy.length}
                    </button>
                )}
            />
        </div>
    );
}
