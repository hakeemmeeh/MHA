export default function AdminLoading() {
  return (
    <div aria-label="Loading admin page" aria-busy="true" className="animate-pulse space-y-8">
      <div className="h-9 w-48 rounded bg-navy-light" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-36 rounded-xl border border-border bg-white" />
        ))}
      </div>
      <div className="h-64 rounded-xl border border-border bg-white" />
    </div>
  );
}
