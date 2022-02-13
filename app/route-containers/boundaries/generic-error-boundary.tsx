import { useCatch } from "remix";

export function GenericErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const caught = useCatch();

  return (
    <div className="py-16">
      <div className="prose prose-invert text-gray-50 max-w-xl mx-auto px-4">
        <div>
          <h1>An unknown error occured.</h1>
          <p>Status: {caught.status}</p>
          <pre>
            <code>{JSON.stringify(caught.data, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
