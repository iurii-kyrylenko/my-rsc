// src/components/getCodeComposite2.tsx

import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import { readFile } from "node:fs/promises";
import z from "zod";
import { CopyButton } from "./CopyButton";

function Code({ text }: { text: string }) {
    return (
        <div className="relative group" >
            <div className="absolute right-4 top-4">
                <CopyButton textToCopy={text} />
            </div>
            <pre className="p-4 bg-slate-600 text-yellow-300 rounded">
                {text}
            </pre>
        </div>
    );
}

export const getCode = createServerFn()
    .inputValidator(z.string().default("package.json"))
    .handler(async ({ data }) => {
        const content = (await readFile(data)).toString();
        const src = await renderServerComponent(<Code text={content} />);
        return { src };
    });
