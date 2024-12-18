import { describe, it, expect, vi, beforeEach } from 'vitest'; // Import Vitest utilities
import { validateTimerForm, TimerFormData } from './validation';
import { toast } from 'sonner';

// Mock the `toast` library
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('validateTimerForm', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('should return false and show error if title is empty', () => {
    const data: TimerFormData = {
      title: '',
      description: '',
      hours: 1,
      minutes: 30,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title is required');
  });

  it('should return false and show error if title exceeds 50 characters', () => {
    const data: TimerFormData = {
      title: 'A'.repeat(51),
      description: '',
      hours: 1,
      minutes: 30,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title must be less than 50 characters');
  });

  it('should return false and show error if time values are negative', () => {
    const data: TimerFormData = {
      title: 'Valid Title',
      description: '',
      hours: -1,
      minutes: 30,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Time values cannot be negative');
  });

  it('should return false and show error if minutes or seconds exceed 59', () => {
    const data: TimerFormData = {
      title: 'Valid Title',
      description: '',
      hours: 1,
      minutes: 60,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Minutes and seconds must be between 0 and 59');
  });

  it('should return false and show error if time is zero', () => {
    const data: TimerFormData = {
      title: 'Valid Title',
      description: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Please set a time greater than 0');
  });

  it('should return false and show error if time exceeds 24 hours', () => {
    const data: TimerFormData = {
      title: 'Valid Title',
      description: '',
      hours: 25,
      minutes: 0,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Timer cannot exceed 24 hours');
  });

  it('should return true for a valid timer form', () => {
    const data: TimerFormData = {
      title: 'Valid Title',
      description: 'A valid timer',
      hours: 1,
      minutes: 30,
      seconds: 0,
    };

    const result = validateTimerForm(data);
    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });
});
