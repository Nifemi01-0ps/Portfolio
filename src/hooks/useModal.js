import { useState, useCallback } from 'react'

export function useModal() {
  const [modal, setModal] = useState(null)
  const openModal = useCallback(project => {
    setModal(project)
    document.body.style.overflow = 'hidden'
  }, [])
  const closeModal = useCallback(() => {
    setModal(null)
    document.body.style.overflow = ''
  }, [])
  return { modal, openModal, closeModal }
}
