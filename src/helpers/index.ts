export const genUUID = (): string => (
  Array.from('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', char => (
    char === 'x' ? Math.floor(Math.random() * 16).toString(16)
  : char === 'y' ? (Math.floor(Math.random() * 4) + 8).toString(16)
  : char
  )).join('')
)
