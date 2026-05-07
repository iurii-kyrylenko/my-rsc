import { createFileRoute } from "@tanstack/react-router";
import { CompositeComponent } from "@tanstack/react-start/rsc";
import { useCallback, useState } from "react";
import { NotificationLayout, streamNotifications } from "~/components/streamNotifications";

export const Route = createFileRoute("/notfications")({
    component: RouteComponent,
})

function RouteComponent() {
    const [notifications, setNotifications] = useState<NotificationLayout[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [notificationId, setNotificationId] = useState("");

    const startStraming = useCallback(async () => {
        setNotifications([]);
        setIsStreaming(true);
        setNotificationId("");

        const stream = await streamNotifications();
        for await (const notification of stream) {
            setNotifications((prev) => [...prev, notification]);
        }

        setIsStreaming(false);
    }, []);

    return (
        <div className="p-2">
            <div className="flex flex-row items-baseline gap-4">
                <button
                    className="mb-2 p-2 text-white bg-blue-700 hover:bg-blue-600 w-3xs rounded-md"
                    onClick={startStraming} disabled={isStreaming}
                >
                    {isStreaming ? 'Streaming...' : 'Load Notifications'}
                </button>
                <div className="font-bold">{notificationId}</div>
            </div>

            <div className="flex flex-row gap-2">
                {notifications.map((src, i) => (
                    <CompositeComponent
                        key={i}
                        src={src}
                        renderActions={({ id }) => (
                            <button
                                className="p-2 text-white bg-green-700 hover:bg-green-600 rounded-md"
                                onClick={() => setNotificationId(id)}
                            >
                                Click me
                            </button>
                        )}
                    />
                ))}
            </div>
        </div>
    );
}