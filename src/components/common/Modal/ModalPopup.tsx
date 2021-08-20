import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";

interface ModalProps {
  open: boolean;
  handleToggle: () => void;
}

const ModalPopup = ({ open, handleToggle }: ModalProps) => {
  const handleOk = () => {
    handleToggle();
  };

  const handleCancel = () => {
    handleToggle();
  };

  return (
    <>
      <Modal title="내용을 입력해 주세요" visible={open} onOk={handleOk} onCancel={handleCancel}>
        <p>Todo에 등록 하려면 내용을 입력해 주세요😥</p>
      </Modal>
    </>
  );
};
export default ModalPopup;
