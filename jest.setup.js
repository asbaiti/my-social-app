// Pre-define globals that expo's winter runtime tries to lazily polyfill,
// preventing it from triggering `import` calls outside Jest's scope.
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}
if (typeof globalThis.__ExpoImportMetaRegistry === 'undefined') {
  globalThis.__ExpoImportMetaRegistry = {};
}
