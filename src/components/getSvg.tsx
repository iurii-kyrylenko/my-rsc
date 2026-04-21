// src/components/getSvg.tsx

import { Graphviz } from "@hpcc-js/wasm-graphviz";
import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import { readFile } from "node:fs/promises";
import z from "zod";

function Svg({ ssvg }: { ssvg: string }) {
    return (
        <div
            id="graph-container"
            className="w-full h-[86vh] flex items-center justify-center p-2
                    [&>svg]:w-full [&>svg]:h-full [&>svg]:block
                    [&_.node]:cursor-pointer [&_.node]:transition-opacity [&_.node]:hover:opacity-80"
            dangerouslySetInnerHTML={{ __html: ssvg ?? "" }}
        />
    );
}

const cleanSvg = (svgString: string) => {
    return svgString
        .replace(/width="[\d\.]+(pt|px)"/g, "")
        .replace(/height="[\d\.]+(pt|px)"/g, "");
};

export const getSvg = createServerFn()
    .inputValidator(z.string().default("src/data/default.dot"))
    .handler(async ({ data }) => {
        const dotString = (await readFile(data)).toString();
        const svgString = await Graphviz.load().then(graphviz => graphviz.dot(dotString));
        const content = cleanSvg(svgString);
        const rsc = await renderServerComponent(<Svg ssvg={content} />);
        // await new Promise((resolve) => setTimeout(() => resolve(0), 1000));
        return { rsc };
    });
