import React from 'react';
import { SettingsFormVague } from './components/SettingsFormVague';
import './App.css';

export function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <header className="max-w-2xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Frontend AI Engineering - FE-03/04</h1>
        <p className="text-gray-600 mt-2">Round 1: Vague AI Prompt Output (Single Prompt, Naive Validation)</p>
      </header>
      <SettingsFormVague />
    </main>
  );
}

export default App;
