import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Collapsible } from '../components/ui/collapsible';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: () => '#11181C',
}));

jest.mock('@/hooks/use-color-scheme', () => ({
  useColorScheme: () => 'light',
}));

jest.mock('@/components/ui/icon-symbol', () => ({
  IconSymbol: ({ name }: { name: string }) => {
    const { Text } = require('react-native');
    return <Text testID="icon">{name}</Text>;
  },
}));

describe('Collapsible', () => {
  it('renders the title', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    expect(screen.getByText('Test Section')).toBeTruthy();
  });

  it('does not show children when collapsed', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    expect(screen.queryByText('Hidden content')).toBeNull();
  });

  it('shows children after pressing the heading', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    fireEvent.press(screen.getByText('Test Section'));
    expect(screen.getByText('Hidden content')).toBeTruthy();
  });

  it('hides children after pressing the heading twice', () => {
    render(
      <Collapsible title="Test Section">
        <Text>Hidden content</Text>
      </Collapsible>
    );
    const title = screen.getByText('Test Section');
    fireEvent.press(title);
    expect(screen.getByText('Hidden content')).toBeTruthy();
    fireEvent.press(title);
    expect(screen.queryByText('Hidden content')).toBeNull();
  });
});
