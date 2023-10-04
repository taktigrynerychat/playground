declare type PatternsMetadata = {
  [group: string]: {
    [pattern: string]: {
      dynamicImport: () => Promise<{ default: () => void }>
      executeByDefault?: boolean
    }
  }
}
