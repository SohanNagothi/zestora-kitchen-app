import { cn } from "@/lib/utils";

interface TextShimmerWaveProps {
  text?: string;
  className?: string;
}

export function TextShimmerWave({ text = "Loading...", className }: TextShimmerWaveProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="relative overflow-hidden rounded-lg bg-muted px-6 py-3">
        <div className="shimmer absolute inset-0" />
        <p className="relative z-10 text-lg font-medium text-foreground/70">
          {text}
        </p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="shimmer h-48 w-full bg-muted" />
      <div className="p-4 space-y-3">
        <div className="shimmer h-6 w-3/4 bg-muted rounded" />
        <div className="shimmer h-4 w-1/2 bg-muted rounded" />
        <div className="flex gap-2">
          <div className="shimmer h-6 w-16 bg-muted rounded-full" />
          <div className="shimmer h-6 w-16 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}
