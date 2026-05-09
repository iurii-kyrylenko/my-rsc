// src/components/CopyButton.tsx

"use client";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
    return (
        <button
            className="text-white bg-blue-500 hover:bg-blue-400 p-4 rounded-full"
            onClick={async () => {
                await navigator.clipboard?.writeText(textToCopy);
            }}
        >
            {`Copy ${textToCopy.length} bytes`}
        </button>
    );
}
