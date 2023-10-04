import React, { useState } from "react";
import { Modal as AntModal } from "antd";

type ModalProps = {
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  isOpen: boolean;
  title: string | null;
  setIsOpen: (value: boolean) => void;
};

const Modal = (props: ModalProps) => {
  const [open, setOpen] = useState(true);

  let modalSize;

  if (props.size == "sm") {
    modalSize = "342px";
  } else if (props.size == "md") {
    modalSize = "498px";
  } else if (props.size == "lg") {
    modalSize = "700px";
  }

  return (
    <>
      {!props.isOpen ? null : (
        <AntModal centered width={modalSize} footer={null} title={props.title} open={open} onCancel={() => props.setIsOpen(false)}>
          <div>
            <div>{props.children}</div>
          </div>
        </AntModal>
      )}
    </>
  );
};

export default Modal;
