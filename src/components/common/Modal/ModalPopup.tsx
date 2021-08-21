import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ModalProps {
  open: boolean;
  type: string;
  handleToggle: (status: string) => void;
}

const { confirm, success } = Modal;

const ModalPopup = ({ open, type, handleToggle }: ModalProps) => {
  const modalByType = () => {
    if (type === "confirm") {
      success({
        title: "내용이 비어있습니다😊",
        icon: <ExclamationCircleOutlined />,
        content: "내용을 입력해야 Todo가 생성 됩니다",
        okText: "확인",
        onOk() {
          handleToggle("");
        },
      });
    }
    if (type === "delete") {
      confirm({
        title: "완료되지 않은 Todo를 삭제 합니다",
        icon: <ExclamationCircleOutlined />,
        content: "정말로 삭제 하시겠습니까?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          handleToggle("delete");
        },
        onCancel() {
          handleToggle("");
        },
      });
    }
  };

  if (open) {
    modalByType();
  }
  return <></>;
};

export default ModalPopup;
