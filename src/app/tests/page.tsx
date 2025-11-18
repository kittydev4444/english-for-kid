"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube } from "lucide-react";

export default function TestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <TestTube className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Test Tracker</h1>
          <p className="text-muted-foreground">
            Track student test scores and progress
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Test tracking features will be available soon. You'll be able to
            record and analyze test scores across different skill areas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
