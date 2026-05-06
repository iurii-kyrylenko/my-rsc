// src/components/getDeferred3.tsx

import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Srv = (props: { data: string }) => <div>{props.data}</div>;

export const getDeferred3 = createServerFn()
    .handler(async () => {
        return {
            cp1: (async () => {
                await delay(3000);
                return renderServerComponent(<Srv data={"3000"} />);
            })(),
            cp2: (async () => {
                await delay(1000);
                return renderServerComponent(<Srv data={"1000"} />);
            })(),
            cp3: (async () => {
                await delay(2000);
                return renderServerComponent(<Srv data={"2000"} />);
            })(),
        }
    });