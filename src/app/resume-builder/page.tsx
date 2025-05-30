"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    // Check if the user is logged in by checking for a token
    if (!token) {
      // Not logged in → redirect to login with return URL
      router.push(`/auth/login?redirect=${encodeURIComponent('/resume-builder')}`);
    }
  }, []);
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <ResumeForm />
          </div>
          <div className="col-span-3">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
