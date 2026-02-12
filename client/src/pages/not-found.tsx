import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4 shadow-xl border-none">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-20 w-20 text-accent" />
          </div>
          
          <h1 className="text-4xl font-display font-bold text-gray-900">404</h1>
          <p className="text-xl font-medium text-gray-700">Page Not Found</p>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12">
              Return to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
