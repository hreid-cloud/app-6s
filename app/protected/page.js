'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function ProtectedPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-8">Protected Route</h1>
        <p className="text-gray-600">
          This is a protected route that can only be accessed with a valid API key.
        </p>
      </div>
    </DashboardLayout>
  );
} 