"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.digest);
    console.error(error.stack);
    console.error(error.cause);
    console.error(error.name);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.digest}</p>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}