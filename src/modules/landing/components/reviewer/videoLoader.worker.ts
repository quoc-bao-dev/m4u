/// <reference lib="webworker" />

const ctx: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope

ctx.addEventListener('message', async (event) => {
  const { src } = event.data || {}
  if (!src) {
    ctx.postMessage({ error: 'Missing video source' })
    return
  }

  try {
    const response = await fetch(src, { credentials: 'include' })
    if (!response.ok) {
      throw new Error(`Failed to load video: ${response.status}`)
    }
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    ctx.postMessage({ objectUrl })
  } catch (error) {
    ctx.postMessage({ error: (error as Error).message })
  }
})

export {}
