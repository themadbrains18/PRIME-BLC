import { createBEM } from "./bem"

export function createNamespace(name) {
  name = `ac-${name}`
  return [createBEM(name), name]
}
