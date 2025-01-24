import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn’t fetch the data. Please try again.",
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-gray-50 rounded-lg shadow-lg text-center sm:flex-row sm:text-left sm:space-y-0 sm:space-x-4 max-w-xl mx-auto mt-40 border">
      <div className="p-3 rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-8 w-8" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2 bg-primary text-white hover:brightness-110"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reload</span>
        </Button>
      </div>
    </div>
  );
}
