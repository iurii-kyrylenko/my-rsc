// src/routes/graph.tsx

import { createFileRoute } from "@tanstack/react-router";
import { getSvg } from "~/components/getSvg";
import { useEffect } from "react";

export const Route = createFileRoute('/graph')({
    loader: async () => {
        const { rsc } = await getSvg({ data: "src/data/hags-nook.dot" });
        return { rsc };
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { rsc } = Route.useLoaderData();

    useEffect(() => {
        let panZoomInstance: any = null;

        // Helper to handle the window resize event
        const handleResize = () => {
            if (panZoomInstance) {
                panZoomInstance.resize();
                panZoomInstance.fit();
                panZoomInstance.center();
            }
        };

        // Ensure the library is only loaded on the client.
        import("svg-pan-zoom").then((svgPanZoom) => {
            const container = document.getElementById("graph-container");
            const svgElement = container?.querySelector("svg");

            if (svgElement) {
                panZoomInstance = svgPanZoom.default(svgElement, {
                    zoomEnabled: true,
                    controlIconsEnabled: true,
                    fit: true,
                    center: true,
                    refreshRate: "auto", // For smooth resizing
                });

                window.addEventListener("resize", handleResize);
            }
        });

        return () => {
            panZoomInstance?.destroy();
            window.removeEventListener("resize", handleResize);
        };
    }, [rsc]);

    return (
        <div className="p-2">
            <h3>GRAPH</h3>
            <div className="dark:invert dark:hue-rotate-180 w-full max-w-5xl mx-auto overflow-hidden border border-slate-300 rounded-xl shadow-sm">
                {rsc}
            </div>
        </div>
    );
}
