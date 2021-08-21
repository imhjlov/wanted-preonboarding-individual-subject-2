import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { Itodo } from "components/todo/TodoService";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { TODAY } from "components/Utils/constans";
import ModalPopup from "components/common/Modal/ModalPopup";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;

  &:hover {
    color: red;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const Date = styled.div<{ done: boolean }>`
  text-align: right;
  margin-right: 20px;
  font-size: 16px;
  color: #119955;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  const [open, setOpen] = useState(false);
  const done = todo.done;

  const setDday = () => {
    const dday = moment(todo.completeDate).diff(TODAY, "day");
    if (dday === 0) {
      return "오늘";
    }
    const remainingDay = dday * -1;
    return remainingDay > 0 ? `D+${remainingDay}` : `D ${remainingDay}`;
  };

  const handleComplete = () => {
    toggleTodo(todo.id);
  };

  const handleRemove = () => {
    removeTodo(todo.id);
    setOpen(false);
  };

  const handleToggle = (status: string) => {
    if (!done) {
      if (status === "delete") {
        handleRemove();
      }
      setOpen(!open);
    }
  };

  useEffect(() => {
    setDday();
  }, []);

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={handleComplete}>
        {done && <CheckOutlined />}
      </CheckCircle>
      <Text done={done}>{todo.text}</Text>
      <Date done={done}>{setDday()}</Date>
      <Remove onClick={() => handleToggle("")}>
        <DeleteOutlined />
      </Remove>
      <ModalPopup open={open} handleToggle={(status) => handleToggle(status)} type="delete" />
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
