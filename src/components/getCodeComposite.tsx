// src/components/getCodeComposite.tsx

import { createServerFn } from "@tanstack/react-start";
import { createCompositeComponent } from "@tanstack/react-start/rsc";
import { readFile } from "node:fs/promises";
import z from "zod";

interface ComompositeLayoutProps {
    copyButton: (data: { textToCopy: string }) => React.ReactNode;
}

const createLayout = (content: string) => createCompositeComponent((props: ComompositeLayoutProps) => (
    <div className="relative group">

        <div className="absolute right-4 top-4">
            {props.copyButton({ textToCopy: content })}
        </div>

        <pre className="p-4 bg-slate-600 text-white rounded">
            {content}
        </pre>
    </div>
));

export const getCode = createServerFn()
    .inputValidator(z.string())
    .handler(async ({ data }) => {
        const content = (await readFile(data)).toString();
        return createLayout(content);
    });
