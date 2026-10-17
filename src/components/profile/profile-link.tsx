import Link from "next/link";

export function getInitials(name?: string | null) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? "?").concat(parts[1]?.[0] ?? "").toUpperCase();
}

export default function ProfileLink({ name }: { name?: string | null }) {
  return (
    <Link
      href="/profile"
      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card py-1 pr-3 pl-1 text-xs font-medium transition-colors hover:bg-muted"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
        {getInitials(name)}
      </span>
      Profile
    </Link>
  );
}
