import { useHandleScript } from './useHandleScript'

export const useHandleNext = () => {
  const { handleScript, fetchMessage } = useHandleScript()

  const handleNext = async (next: string) => {
    const response = await fetchMessage(next)
    await handleScript(response)
  }

  return {
    handleNext,
  }
}
