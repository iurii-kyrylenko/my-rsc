## Observations on the Flight Stream
If you look at the Network tab for this version, you will notice:

* The textToCopy content is sent as part of the props of the slot call.
* The pre tag content is sent as a standard React element chunk.
* Even if the file is massive, the Flight protocol handles the streaming, so the "Copy" button can actually become interactive before the entire `<pre>` block has finished downloading (if using Suspense).
