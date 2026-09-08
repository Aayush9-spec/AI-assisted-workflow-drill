import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, type SettingsFormData } from '../schemas/settingsSchema';
import { User, Mail, AtSign, Lock, Bell, CheckCircle, AlertCircle, Loader2, Moon, Sun } from 'lucide-react';

export const SettingsFormPrecise: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: 'Aayush Kumar',
      username: 'aayush_dev',
      email: 'aayush@example.com',
      bio: 'Frontend AI Engineer intern building production AI workflows.',
      emailNotifications: true,
      pushNotifications: false,
      currentPassword: '',
      newPassword: '',
    },
  });

  const bioValue = watch('bio') || '';

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);
    setToast(null);

    try {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Successfully saved settings (Round 2):', data);
      setToast({ message: 'Settings successfully updated and saved!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to update settings. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} p-4 md:p-8`}>
      <div className="max-w-2xl mx-auto">
        {/* Header & Theme Toggle */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your personal profile and notification preferences.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-pressed={isDarkMode}
            aria-label="Toggle dark mode"
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>

        {/* Status Toast Announcement (ARIA Live Region) */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 p-4 rounded-lg flex items-center justify-between border ${
              toast.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Close message"
              className="text-xs opacity-70 hover:opacity-100 font-semibold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Section 1: Profile Details */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <User className="w-5 h-5 text-indigo-500" /> Profile Information
            </h2>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                {...register('fullName')}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-indigo-500'
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Username & Email Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="username"
                    type="text"
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? 'username-error' : undefined}
                    {...register('username')}
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.username
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p id="username-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="email"
                    type="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email')}
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Bio with Character Counter */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="bio" className="block text-sm font-medium">
                  Bio / About Me
                </label>
                <span
                  className={`text-xs ${
                    bioValue.length > 180 ? 'text-amber-500 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {bioValue.length} / 200
                </span>
              </div>
              <textarea
                id="bio"
                rows={3}
                aria-invalid={!!errors.bio}
                aria-describedby={errors.bio ? 'bio-error' : undefined}
                {...register('bio')}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.bio
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                    : 'border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-indigo-500'
                }`}
              />
              {errors.bio && (
                <p id="bio-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.bio.message}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Notifications */}
          <fieldset className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <legend className="text-lg font-semibold flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3 w-full">
              <Bell className="w-5 h-5 text-indigo-500" /> Notification Preferences
            </legend>
            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('emailNotifications')}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-sm font-medium block">Email Notifications</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Receive weekly summary digests and security updates.
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register('pushNotifications')}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div>
                  <span className="text-sm font-medium block">Push Notifications</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Receive immediate browser notifications for account updates.
                  </span>
                </div>
              </label>
            </div>
          </fieldset>

          {/* Section 3: Password Update */}
          <fieldset className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <legend className="text-lg font-semibold flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3 w-full">
              <Lock className="w-5 h-5 text-indigo-500" /> Change Password
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  aria-invalid={!!errors.currentPassword}
                  aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
                  {...register('currentPassword')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    errors.currentPassword
                      ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                      : 'border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-indigo-500'
                  }`}
                />
                {errors.currentPassword && (
                  <p id="currentPassword-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  aria-invalid={!!errors.newPassword}
                  aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                  {...register('newPassword')}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    errors.newPassword
                      ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20'
                      : 'border-slate-300 dark:border-slate-600 dark:bg-slate-900 focus:ring-indigo-500'
                  }`}
                />
                {errors.newPassword && (
                  <p id="newPassword-error" role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              Reset Changes
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
