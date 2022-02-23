declare var webpackJsonp: any

export const jQuery: JQueryStatic = (() => {
  const id = Math.random().toString(36).substring(7)
  const args = [
    [1000],
    {
      [id]: (_: unknown, __: unknown, {c: cac, m}: {
        c: {
          [key: string]: {
            exports: unknown
          }
        },
        m: unknown[]
      }): void => {
        Object.keys(cac).forEach((mod) => {
          obj[mod] = cac[mod].exports
        })
        arr = m
      },
    },
    [[id]],
  ]

  const obj: {[key: string]: unknown} = {}
  let arr: unknown[] = []

  webpackJsonp.push(args)

  const findFunction = (query: string) => {
    const results: unknown[] = []
    arr.forEach((ctor, index) => {
      if (String(ctor).includes(query)) {
        results.push(obj[index])
      }
    })
    return results
  }

  return findFunction('jquery:')[0] as JQueryStatic
})()
