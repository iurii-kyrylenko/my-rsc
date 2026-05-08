import { createFileRoute } from "@tanstack/react-router";
import { getFlightStream } from "~/components/getFlightStream";

export const Route = createFileRoute("/flight")({
    loader: async () => {
        const stream = await getFlightStream();
        const response = new Response(stream);
        return response.text();
    },
    component: RouteComponent,
});

function RouteComponent() {
    const src = Route.useLoaderData();

    return (
        <div className="p-2 flex flex-col gap-2">
            FLIGHT STREAM
            <pre>
                {src}
            </pre>
        </div>
    );
}
