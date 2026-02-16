import { renderHook } from '@testing-library/react-native';

import { Colors } from '../constants/theme';

let mockColorScheme: 'light' | 'dark' = 'light';

jest.mock('@/hooks/use-color-scheme', () => ({
  useColorScheme: () => mockColorScheme,
}));

import { useThemeColor } from '../hooks/use-theme-color';

describe('useThemeColor', () => {
  beforeEach(() => {
    mockColorScheme = 'light';
  });

  it('returns the light theme default text color', () => {
    const { result } = renderHook(() => useThemeColor({}, 'text'));
    expect(result.current).toBe(Colors.light.text);
  });

  it('returns the light prop override when in light mode', () => {
    const { result } = renderHook(() =>
      useThemeColor({ light: '#ff0000', dark: '#00ff00' }, 'text')
    );
    expect(result.current).toBe('#ff0000');
  });

  it('returns the light theme background color', () => {
    const { result } = renderHook(() => useThemeColor({}, 'background'));
    expect(result.current).toBe(Colors.light.background);
  });

  it('returns dark theme text color when in dark mode', () => {
    mockColorScheme = 'dark';
    const { result } = renderHook(() => useThemeColor({}, 'text'));
    expect(result.current).toBe(Colors.dark.text);
  });

  it('returns the dark prop override when in dark mode', () => {
    mockColorScheme = 'dark';
    const { result } = renderHook(() =>
      useThemeColor({ light: '#ff0000', dark: '#00ff00' }, 'text')
    );
    expect(result.current).toBe('#00ff00');
  });

  it('returns dark theme background color when in dark mode', () => {
    mockColorScheme = 'dark';
    const { result } = renderHook(() => useThemeColor({}, 'background'));
    expect(result.current).toBe(Colors.dark.background);
  });

  it('falls back to theme default when only the other mode prop is given', () => {
    mockColorScheme = 'light';
    const { result } = renderHook(() =>
      useThemeColor({ dark: '#00ff00' }, 'text')
    );
    expect(result.current).toBe(Colors.light.text);
  });
});
