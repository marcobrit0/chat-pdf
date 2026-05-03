/**
 * Inner content container for `/app` routes. Outer chrome (header) lives in
 * `app/(app)/layout.tsx`.
 */
export default function AppWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">{children}</div>
  );
}
