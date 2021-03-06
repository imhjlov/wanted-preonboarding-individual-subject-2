import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Itodo } from "components/todo/TodoService";
import ModalPopup from "components/common/Modal/ModalPopup";
import DateSelect from "./DateSelect";

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({ nextId, createTodo, incrementNextId }: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [completeDate, setDate] = useState(moment().startOf("day").format("L"));

  const handleToggle = (status: string) => {
    if (value === "") setOpen(!open);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleSetDate = (selectDate: string) => {
    setDate(selectDate);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    createTodo({
      id: nextId,
      text: value,
      done: false,
      completeDate: completeDate,
    });
    incrementNextId();
    setValue("");
    setOpen(false);
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <DateSelect handleSetDate={handleSetDate} />
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />

          <SubmitButton onClick={() => handleToggle("")} open={open}>
            <PlusCircleOutlined />
          </SubmitButton>
        </InsertForm>
      </InsertFormPositioner>
      <ModalPopup open={open} handleToggle={() => handleToggle("")} type="confirm" />
    </>
  );
};

const SubmitButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #119955;
    cursor: pointer;
  }
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 80%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

export default React.memo(TodoCreate);
