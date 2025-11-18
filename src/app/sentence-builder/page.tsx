"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle } from "lucide-react";

export default function SentenceBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Puzzle className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Sentence Builder</h1>
          <p className="text-muted-foreground">
            Interactive sentence construction tool
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sentence builder features will be available soon. Students will be
            able to practice constructing sentences with drag-and-drop word
            tiles.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
