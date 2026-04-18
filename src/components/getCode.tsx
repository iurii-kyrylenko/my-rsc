// src/components/getCode.tsx

import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import { readFile } from "node:fs/promises";

function Code({ text }: { text: string }) {
    return <pre>{text}</pre>;
}

export const getCode = createServerFn()
    .handler(async () => {
        const content = (await readFile("package.json")).toString();
        const Renderable = await renderServerComponent(<Code text={content} />);
        return { Renderable };
    });
