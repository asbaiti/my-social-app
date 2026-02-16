import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { ThemedView } from '../components/themed-view';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: (_props: Record<string, string>, _colorName: string) => '#fff',
}));

describe('ThemedView', () => {
  it('renders children', () => {
    render(
      <ThemedView>
        <Text>Child content</Text>
      </ThemedView>
    );
    expect(screen.getByText('Child content')).toBeTruthy();
  });

  it('applies background color from theme', () => {
    render(<ThemedView testID="view" />);
    const element = screen.getByTestId('view');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.backgroundColor).toBe('#fff');
  });

  it('merges custom style prop', () => {
    render(<ThemedView testID="view" style={{ padding: 20 }} />);
    const element = screen.getByTestId('view');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.padding).toBe(20);
    expect(flatStyle.backgroundColor).toBe('#fff');
  });
});
