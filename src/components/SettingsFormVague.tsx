import React, { useState } from 'react';

// ROUND 1: Vague Prompt Output
// Prompt: "Build a user settings page with validation"
// Flaws in this output:
// 1. Naive state (scattered useState calls for 8 different fields)
// 2. Manual inline validation logic in handleSubmit with loose rules
// 3. Zero ARIA attributes (no aria-invalid, no aria-describedby, no role="alert")
// 4. No schema validation (Zod / React Hook Form missing)
// 5. Silent failure on error & no loading / pending submission state management
// 6. Hardcoded inline styles mixed with basic CSS classes

export const SettingsFormVague: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: any = {};

    // Vague / naive validation checks
    if (!name) errs.name = 'Name required';
    if (!username) errs.username = 'Username required';
    if (!email || !email.includes('@')) errs.email = 'Invalid email';
    if (newPassword && newPassword.length < 4) errs.newPassword = 'Password short';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSuccess(false);
      return;
    }

    setErrors({});
    setSuccess(true);
    // Simulating save without async error handling
    console.log('Saved vague settings', { name, username, email, bio, emailNotifs });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2>Profile Settings (Round 1 - Vague)</h2>
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>Saved successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.username && <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Bio</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <input 
              type="checkbox" 
              checked={emailNotifs} 
              onChange={(e) => setEmailNotifs(e.target.checked)} 
            /> Receive Email Notifications
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Current Password</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>New Password</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {errors.newPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.newPassword}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Save Settings
        </button>
      </form>
    </div>
  );
};
