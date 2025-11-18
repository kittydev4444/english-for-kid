'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { User as UserIcon } from 'lucide-react';

export default function ProfilePage() {
  const studentProfile = useAppStore((state) => state.studentProfile);
  const updateStudentProfile = useAppStore((state) => state.updateStudentProfile);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateStudentProfile({
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string),
      learningGoals: formData.get('learningGoals') as string,
      notes: formData.get('notes') as string,
      parentContact: {
        name: formData.get('parentName') as string,
        phone: formData.get('parentPhone') as string,
        email: formData.get('parentEmail') as string,
      },
    });
    alert('Profile updated!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <UserIcon className="h-12 w-12 text-primary" />
        <div>
          <h1 className="text-4xl font-bold">Student Profile</h1>
          <p className="text-muted-foreground">Manage student information</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={studentProfile.name}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                defaultValue={studentProfile.age}
                required
              />
            </div>
            <div>
              <Label htmlFor="learningGoals">Learning Goals</Label>
              <Textarea
                id="learningGoals"
                name="learningGoals"
                defaultValue={studentProfile.learningGoals}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parent Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="parentName">Parent Name</Label>
              <Input
                id="parentName"
                name="parentName"
                defaultValue={studentProfile.parentContact.name}
              />
            </div>
            <div>
              <Label htmlFor="parentPhone">Phone</Label>
              <Input
                id="parentPhone"
                name="parentPhone"
                type="tel"
                defaultValue={studentProfile.parentContact.phone}
              />
            </div>
            <div>
              <Label htmlFor="parentEmail">Email</Label>
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                defaultValue={studentProfile.parentContact.email}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>
              Additional notes about learning style, preferences, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={studentProfile.notes}
              rows={6}
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full">
          Save Profile
        </Button>
      </form>
    </div>
  );
}
