declare type Patterns = {
  [pattern: string]: {
    dynamicImport: () => Promise<{ default: () => void }>
    executeByDefault?: boolean
  }
}
