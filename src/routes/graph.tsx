// src/routes/graph.tsx

import { createFileRoute } from "@tanstack/react-router";
import { getSvg } from "~/components/getSvg";
import { useEffect, useRef } from "react";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

const graphQueryOptions = (dotPath?: string) => queryOptions({
    queryKey: ["dot", dotPath],
    structuralSharing: false,
    queryFn: () => getSvg({ data: dotPath }),
    staleTime: Infinity,
    retry: false,
});

const dotPath = "src/data/inception.dot";

export const Route = createFileRoute('/graph')({
    loader: ({ context }) => context.queryClient.ensureQueryData(graphQueryOptions(dotPath)),
    component: RouteComponent,
})

function RouteComponent() {
    const { data } = useQuery(graphQueryOptions(dotPath));
    const rsc = data?.rsc;

    const panZoomRef = useRef<any>(null);

    useEffect(() => {
        let resizeListener: (() => void) | null = null;

        const init = async () => {
            const container = document.getElementById("graph-container");
            const svgElement = container?.querySelector("svg");

            if (!svgElement) return;

            const { default: svgPanZoom } = await import("svg-pan-zoom");

            panZoomRef.current = svgPanZoom(svgElement, {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: true,
                center: true,
            });

            resizeListener = () => {
                try {
                    panZoomRef.current?.resize().fit().center();
                } catch (e) {
                    // Keeps the console clean during extreme window resizing
                }
            };

            window.addEventListener("resize", resizeListener);
        };

        init();

        return () => {
            panZoomRef.current?.destroy();
            panZoomRef.current = null;
            if (resizeListener) window.removeEventListener("resize", resizeListener);
        };
    }, [rsc]); // Re-run if the RSC content changes

    return (
        <div className="p-2">
            <h3>GRAPH</h3>
            <div className="dark:invert dark:hue-rotate-180 w-full max-w-5xl mx-auto overflow-hidden border border-slate-300 rounded-xl shadow-sm">
                {rsc}
            </div>
        </div>
    );
}
