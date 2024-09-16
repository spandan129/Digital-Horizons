import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuoteComponent = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Today's Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 italic">
          "Education is the passport to the future, for tomorrow belongs to
          those who prepare for it today."
        </p>
        <p className="text-right text-sm text-gray-500 mt-2">- Malcolm X</p>
      </CardContent>
    </Card>
  );
};

export default QuoteComponent;
