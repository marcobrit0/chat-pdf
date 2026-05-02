/**
 * Authenticated product shell — session gate lives in middleware + Supabase cookies.
 */
export default function AppWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">{children}</div>
    </div>
  );
}
