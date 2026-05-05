// src/components/getCode.tsx

import { createServerFn } from "@tanstack/react-start";
import { createCompositeComponent, renderServerComponent } from "@tanstack/react-start/rsc";
import { readFile } from "node:fs/promises";
import z from "zod";

function Code({ text }: { text: string }) {
    return <pre>{text}</pre>;
}

export const getCode = createServerFn()
    .inputValidator(z.string().default("package.json"))
    .handler(async ({ data }) => {
        const content = (await readFile(data)).toString();
        const src = await renderServerComponent(<Code text={content} />);
        // const src = await createCompositeComponent(() => (<Code text={content} />));
        await new Promise((resolve) => setTimeout(() => resolve(0), 1000));
        return { src };
    });
