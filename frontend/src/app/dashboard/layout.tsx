export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-[#030303]">
      {children}
    </div>
  );
}
