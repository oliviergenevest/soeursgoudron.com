import { useState } from 'react'

export const useModal = (initialMode = false) => {
    const [modalOpen, setModalOpen] = useState(initialMode)
    const toggle = () => setModalOpen(!modalOpen)
    return [modalOpen, setModalOpen, toggle]
}

export const useModalWithData = (
    initialMode = false,
    initialSelected = null
  ) => {
    const [modalOpen, setModalOpen] = useModal(initialMode)
    const [selected, setSelected] = useState(initialSelected)
    const setModalState = state => {
     
      if (state === false) {
        /*setSelected(null)*/
         // Enables Background Scrolling whilst the SideDrawer/Modal is open
         if (typeof window != 'undefined' && window.document ) {
          document.body.style.overflow = 'unset';
        }
         
      }
       setModalOpen(state)
    if (typeof window != 'undefined' && window.document && state === true ) {
          document.body.style.overflow = 'hidden';
        }
    }
    return { modalOpen, setModalOpen, selected, setSelected, setModalState }
  }