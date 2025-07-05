import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PriorityType = "High" | "Medium" | "Low";

interface PriorityBadgeProps {
  priority: PriorityType;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const getPriorityStyle = (priority: PriorityType) => {
    switch (priority) {
      case "High":
        return "bg-priority-high text-priority-high-foreground";
      case "Medium":
        return "bg-priority-medium text-priority-medium-foreground";
      case "Low":
        return "bg-priority-low text-priority-low-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Badge 
      className={cn(
        "text-xs px-2 py-1 font-medium",
        getPriorityStyle(priority),
        className
      )}
    >
      {priority}
    </Badge>
  );
}