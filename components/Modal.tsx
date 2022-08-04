import React, { ReactNode, useEffect, useRef } from 'react';
import Sheet from 'react-modal-sheet';
import { XIcon } from "@heroicons/react/outline"
import { useOnClickOutside } from 'usehooks-ts'

type Props = {
  open: boolean,
  title: string,
  children: ReactNode,
  bodyClass?: string,
  onClose?: () => void
}

export const Modal = ({ open, title, children, bodyClass = "modal-active", onClose = () => {} }: Props) => {
  const ref = useRef(null)
  // useOnClickOutside(ref, onClose);

  useEffect(() => {
    open ? document.body.classList.add(bodyClass) : document.body.classList.remove(bodyClass);
  }, [open])

  return (
    <div ref={ref}>
    <Sheet isOpen={open} onClose={() => onClose()}>
      <Sheet.Container>
        <Sheet.Header>
          <header className="flex w-full justify-between items-center py-2 px-3">
            <div/>
            <span className="text-center font-medium">{title}</span>
            <button type="button" onClick={() => onClose()}>
              <XIcon className="h-5 w-5 text-black"/>
            </button>
          </header>
        </Sheet.Header>
        <Sheet.Content>
          <div className="px-3 pb-3">
            {children}
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
    </div>
  );
}