'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <FileText className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Weekly Reports</h1>
          <p className="text-muted-foreground">Generate progress reports for parents</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Report generation features will be available soon. You'll be able to create
            weekly summaries of progress, attendance, and achievements.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
