'use client';

import Image from "next/image";
import DashboardLayout from '@/components/DashboardLayout';
import { SignInButton } from '@/components/SignInButton';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                Your API Management Solution
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Simplify your API key management with our secure and intuitive dashboard.
              </p>
              <div className="flex gap-4 justify-center">
                <SignInButton />
                {session && (
                  <a
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    href="/dashboards"
                  >
                    Manage API Keys
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join thousands of developers who trust our platform.</p>
            <SignInButton />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </div>
            <div className="flex gap-8">
              <a
                href="https://nextjs.org/learn"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
              <a
                href="https://github.com/yourusername/yourrepo"
                className="text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="/privacy"
                className="text-sm hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}

const features = [
  {
    title: "Secure Storage",
    description: "Your API keys are encrypted and stored with industry-standard security practices."
  },
  {
    title: "Easy Management",
    description: "Intuitive interface to create, update, and revoke API keys with just a few clicks."
  },
  {
    title: "Access Control",
    description: "Fine-grained permissions and role-based access control for team management."
  }
];
