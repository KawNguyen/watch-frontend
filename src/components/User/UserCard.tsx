import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UserCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  className?: string;
  children: React.ReactNode;
}

const UserCard = ({ title, icon, count, className, children }: UserCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
        </CardTitle>
        <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
          {count} items
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default UserCard;