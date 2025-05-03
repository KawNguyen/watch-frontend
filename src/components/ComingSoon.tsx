import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This page is under construction and will be available soon.
          </p>
          
          <Button asChild>
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;