import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "In-process" | "Need to start" | "Complete" | "Blocked";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyle = (status: StatusType) => {
    switch (status) {
      case "In-process":
        return "bg-status-in-process text-status-in-process-foreground";
      case "Need to start":
        return "bg-status-need-to-start text-status-need-to-start-foreground border border-border";
      case "Complete":
        return "bg-status-complete text-status-complete-foreground";
      case "Blocked":
        return "bg-status-blocked text-status-blocked-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Badge 
      className={cn(
        "text-xs px-2 py-1 font-medium",
        getStatusStyle(status),
        className
      )}
    >
      {status}
    </Badge>
  );
}