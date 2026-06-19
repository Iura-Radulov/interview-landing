/**
 * JSON-LD Schema component for Next.js App Router.
 * Renders <script type="application/ld+json"> with Schema.org structured data.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
