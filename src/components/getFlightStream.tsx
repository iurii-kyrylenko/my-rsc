import { createServerFn } from "@tanstack/react-start";
import { renderToReadableStream } from "@tanstack/react-start/rsc";

const MyComponent = (props: { answer: number }) => <span>{props.answer}</span>;

const src = <div>Server Rendered Content: <MyComponent answer={42} /></div>;

export const getFlightStream = createServerFn()
    .handler(() => renderToReadableStream(src));
