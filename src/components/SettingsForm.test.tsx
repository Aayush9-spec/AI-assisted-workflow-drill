import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { SettingsFormPrecise } from './SettingsFormPrecise';

describe('SettingsFormPrecise (Round 2)', () => {
  it('renders all primary form fields and default values', () => {
    render(<SettingsFormPrecise />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Settings/i })).toBeInTheDocument();
  });

  it('shows validation errors when required fields are cleared and submitted', async () => {
    render(<SettingsFormPrecise />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
    });
  });

  it('validates invalid username formats', async () => {
    render(<SettingsFormPrecise />);

    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: 'user name!' } });

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Username can only contain letters, numbers, and underscores/i)).toBeInTheDocument();
    });
  });

  it('submits form successfully and displays accessible toast status message', async () => {
    render(<SettingsFormPrecise />);

    const submitBtn = screen.getByRole('button', { name: /Save Settings/i });
    fireEvent.click(submitBtn);

    await waitFor(
      () => {
        const statusToast = screen.getByRole('status');
        expect(statusToast).toBeInTheDocument();
        expect(statusToast).toHaveTextContent(/Settings successfully updated and saved!/i);
      },
      { timeout: 2000 }
    );
  });

  it('toggles dark mode theme button with correct aria-pressed attribute', () => {
    render(<SettingsFormPrecise />);

    const themeToggle = screen.getByRole('button', { name: /Toggle dark mode/i });
    expect(themeToggle).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(themeToggle);
    expect(themeToggle).toHaveAttribute('aria-pressed', 'true');
  });
});
