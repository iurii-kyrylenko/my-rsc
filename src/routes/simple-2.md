When a user refreshes the browser on the /simple route, the flow shifts from a client-side API call to a full Server-Side Rendering (SSR) cycle. In this scenario, the network "hop" for the Server Function is eliminated because everything is already on the server. [1, 2, 3] 
## 1. Server-Side Execution (The "Direct" Path)
Because the request originates from the browser URL bar, the server handles the entire lifecycle before sending a single byte of HTML:

* Loader Execution: The TanStack Router loader runs directly on the server.
* In-Process Function Call: Instead of making an HTTP POST request, the router calls getCode as a standard local asynchronous function.
* RSC Generation: The getCode handler executes, reads the file, and runs renderServerComponent. This produces the Flight protocol payload in memory.
* Final Object: The loader finishes, returning the object { Code: Renderable } where Renderable is the serialized RSC tree. [1, 3, 4, 5] 

## 2. Full-Document Rendering
Once the loader is finished, TanStack Start renders the entire React tree to a static string:

* React SSR: React renders the RouteComponent to HTML. When it hits the {Code} element, it uses the Flight data generated in the previous step to produce the final `<pre>...</pre>` HTML tags.
* Data Dehydration: The server takes the serialized Renderable (the Flight string) and the loader data and injects them into a `<script>` tag in the HTML. This is called dehydration. [1, 6, 7, 8] 

## 3. Client-Side Hydration
The browser receives a fully-formed HTML page and displays the code immediately (Fast First Paint). Then:

* Hydration: The client-side React runtime "wakes up." It reads the dehydrated loader data from the script tag so it doesn't have to call getCode again.
* Interactive Handover: React attaches event listeners to the existing HTML. Since the server already rendered the <pre> tag using the Flight data, the client simply confirms the UI matches and becomes interactive. [6, 7, 9, 10] 

## Comparison: Refresh vs. Navigation

| Action | getCode Execution | Network Request | Initial UI |
|---|---|---|---|
| Refresh | Local (on Server) | None (SSR) | Immediate HTML |
| Link Click | Remote (via RPC) | HTTP POST | Loading State (if used) |

Would you like to know how to debug the dehydrated state in the browser to see exactly what data was sent during this refresh?

[1] [https://tanstack.com](https://tanstack.com/start/v0/docs/framework/react/guide/selective-ssr)
[2] [https://paths.grasp.study](https://paths.grasp.study/public-courses/5514b5ac-04e3-432b-8e60-825c91487ddd/modules/ba40a7a4-f338-4d7a-81e3-3a7ab48710fc/lessons/25d00760-6aa4-49e0-a818-19de97ebf79a)
[3] [https://frontendmasters.com](https://frontendmasters.com/blog/introducing-tanstack-start/)
[4] [https://zenn.dev](https://zenn.dev/tsuboi/articles/0d2d63b584aa2c?locale=en)
[5] [https://tanstack.com](https://tanstack.com/start/v0/docs/framework/react/guide/server-routes)
[6] [https://mintlify.com](https://mintlify.com/TanStack/router/start/concepts/ssr)
[7] [https://mintlify.com](https://mintlify.com/tanstack/router/start/concepts/server-rendering#:~:text=The%20client%20router%20reads%20serialized%20state%20from,HTML.%20The%20app%20becomes%20interactive%20without%20re%2Drendering.)
[8] [https://tanstack.com](https://tanstack.com/router/latest/docs/guide/ssr)
[9] [https://zenn.dev](https://zenn.dev/tsuboi/articles/0d2d63b584aa2c?locale=en)
[10] [https://tanstack.com](https://tanstack.com/start/v0/docs/framework/react/guide/execution-model)
