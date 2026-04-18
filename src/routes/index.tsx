// src/routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    return (
        <div className="p-2">
            <h3>HOME</h3>
        </div>
    );
}
