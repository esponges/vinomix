import { useCatch } from "remix";

export function GenericErrorBoundary({ error }: { error: Error }) {

  return (
    <div className="py-16">
      <div className="prose prose-invert text-gray-50 max-w-xl mx-auto px-4">
        <div>
          <h1>An unknown error occured.</h1>
          <p>Stack: {error.stack}</p>
        </div>
      </div>
    </div>
  );
}
