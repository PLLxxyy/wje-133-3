import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 border border-dashed border-[color:var(--border)] bg-[color:var(--surface-muted)] p-8 text-center">
      <Inbox className="h-8 w-8 text-[color:var(--text-muted)]" aria-hidden="true" />
      <div>
        <p className="text-base font-semibold text-[color:var(--text-primary)]">{title}</p>
        <p className="mt-1 max-w-sm text-sm text-[color:var(--text-muted)]">{description}</p>
      </div>
      {action}
    </div>
  );
}
