/**
 * Route group for `/app` — no marketing chrome; session enforced in middleware.
 */
export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
