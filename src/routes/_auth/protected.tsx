import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/protected")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="p-2">Hello "/_auth/protected"!</div>
    );
}
