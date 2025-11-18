'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Library } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Library className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Resources Library</h1>
          <p className="text-muted-foreground">Teaching resources and materials</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Resource library features will be available soon. You'll be able to organize
            and access teaching materials, games, songs, and activities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
