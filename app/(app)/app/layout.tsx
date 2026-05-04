/**
 * Inner content container for `/app` routes. Outer chrome (header) lives in
 * `app/(app)/layout.tsx`. The workspace shell is full-bleed (sidebar + main),
 * but nested routes get a centered container.
 */
export default function AppWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-canvas">{children}</div>;
}
