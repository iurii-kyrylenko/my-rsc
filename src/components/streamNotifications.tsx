import { createServerFn } from "@tanstack/react-start";
import { createCompositeComponent } from "@tanstack/react-start/rsc";
import { ReactNode } from "react";


const db = {
    _data: [
        { id: "111", title: "t-111", message: "m-111" },
        { id: "222", title: "t-222", message: "m-222" },
        { id: "333", title: "t-333", message: "m-333" },
        { id: "444", title: "t-444", message: "m-444" },
        { id: "555", title: "t-555", message: "m-555" },
        { id: "666", title: "t-666", message: "m-666" },
        { id: "777", title: "t-777", message: "m-777" },
        { id: "888", title: "t-888", message: "m-888" },
    ],
    notifications: {
        getRecent(n: number) {
            return Promise.resolve(db._data.slice(0, n));
        },
        getOlder(n: number) {
            return Promise.resolve(db._data.slice(-n));
        },
    },
};

interface Notification {
    id: string;
    title: string;
    message: string;
}

interface NotificationLayoutProps {
    renderActions: (data: { id: string }) => ReactNode;
}

const createNotificationLayout = ({ id, title, message }: Notification) => createCompositeComponent(
    (props: NotificationLayoutProps) => (
        <div className="p-2 border-1 rounded-md bg-green-100">
            <h3>{title}</h3>
            <div>{message}</div>
            {props.renderActions({ id })}
        </div>
    )
);

export type NotificationLayout = Awaited<ReturnType<typeof createNotificationLayout>>;

export const streamNotifications = createServerFn()
    .handler(async function* () {
        // Yield initial batch immediately
        const recent = await db.notifications.getRecent(3);
        for (const notification of recent) {
            yield await createNotificationLayout(notification);
        }

        // Stream older notifications with delays
        const older = await db.notifications.getOlder(5);
        for (const notification of older) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            yield await createNotificationLayout(notification);
        }
    });
