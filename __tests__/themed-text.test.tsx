import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '../components/themed-text';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: (_props: Record<string, string>, _colorName: string) => '#11181C',
}));

describe('ThemedText', () => {
  it('renders text content', () => {
    render(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('applies default style by default', () => {
    render(<ThemedText testID="text">Default</ThemedText>);
    const element = screen.getByTestId('text');
    const flatStyle = Array.isArray(element.props.style)
      ? Object.assign({}, ...element.props.style.filter(Boolean))
      : element.props.style;
    expect(flatStyle.fontSize).toBe(16);
    expect(flatStyle.lineHeight).toBe(24);
  });

  it('applies title style when type is title', () => {
    render(
      <ThemedText testID="text" type="title">
        Title
      </ThemedText>
    );
    const element = screen.getByTestId('text');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.fontSize).toBe(32);
    expect(flatStyle.fontWeight).toBe('bold');
  });

  it('applies subtitle style when type is subtitle', () => {
    render(
      <ThemedText testID="text" type="subtitle">
        Subtitle
      </ThemedText>
    );
    const element = screen.getByTestId('text');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.fontSize).toBe(20);
    expect(flatStyle.fontWeight).toBe('bold');
  });

  it('applies link style when type is link', () => {
    render(
      <ThemedText testID="text" type="link">
        Link
      </ThemedText>
    );
    const element = screen.getByTestId('text');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.fontSize).toBe(16);
    expect(flatStyle.lineHeight).toBe(30);
    expect(flatStyle.color).toBe('#0a7ea4');
  });

  it('applies defaultSemiBold style', () => {
    render(
      <ThemedText testID="text" type="defaultSemiBold">
        Bold
      </ThemedText>
    );
    const element = screen.getByTestId('text');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.fontWeight).toBe('600');
  });

  it('merges custom style prop', () => {
    render(
      <ThemedText testID="text" style={{ marginTop: 10 }}>
        Styled
      </ThemedText>
    );
    const element = screen.getByTestId('text');
    const flatStyle = Object.assign({}, ...element.props.style.filter(Boolean));
    expect(flatStyle.marginTop).toBe(10);
  });
});
