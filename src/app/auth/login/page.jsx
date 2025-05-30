"use client"

// pages/signin.js (or wherever this lives)
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ─── form state ───────────────────────────────────────
  const [form, setForm]     = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // ─── submit & call backend ────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      console.log('Login successful:', data);


      // ✅ Correct way to get redirect path from URL
      const redirectPath = searchParams.get('redirect') || '/';
      console.log('Redirecting to:', redirectPath);

      window.location.href = redirectPath;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-[45%] overflow-hidden">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      className="block border w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <br />

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      w-full flex justify-center
                      rounded-md bg-indigo-600 px-3 py-1.5
                      text-sm leading-6 font-semibold text-balck
                      shadow-lg hover:bg-indigo-500
                      focus:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {loading ? 'Signing in…' : 'Sign in'}
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member of ResuAI?{' '}
                <a href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  SignUp here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
