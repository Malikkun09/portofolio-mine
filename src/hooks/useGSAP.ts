import { useEffect, DependencyList, RefObject } from 'react'
import gsap from 'gsap'

export function useGSAP(
  callback: () => gsap.Context | void,
  refs: RefObject<HTMLElement | null>[],
  deps: DependencyList = []
) {
  useEffect(() => {
    const ctx = callback()
    return () => {
      if (ctx) {
        ctx.revert()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
