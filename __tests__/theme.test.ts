import { Colors } from '../constants/theme';

describe('Colors', () => {
  it('defines light theme colors', () => {
    expect(Colors.light).toBeDefined();
    expect(Colors.light.text).toBe('#11181C');
    expect(Colors.light.background).toBe('#fff');
    expect(Colors.light.tint).toBe('#0a7ea4');
    expect(Colors.light.icon).toBe('#687076');
  });

  it('defines dark theme colors', () => {
    expect(Colors.dark).toBeDefined();
    expect(Colors.dark.text).toBe('#ECEDEE');
    expect(Colors.dark.background).toBe('#151718');
    expect(Colors.dark.tint).toBe('#fff');
    expect(Colors.dark.icon).toBe('#9BA1A6');
  });

  it('has matching keys in light and dark themes', () => {
    const lightKeys = Object.keys(Colors.light).sort();
    const darkKeys = Object.keys(Colors.dark).sort();
    expect(lightKeys).toEqual(darkKeys);
  });
});
