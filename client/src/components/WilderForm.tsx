import React, { useState, FormEvent, useRef } from "react";
import { IWilder, IWilderInput } from "../types/IWilder";
import { createWilder } from "../services/wilders";
import toast from "react-hot-toast";
import { CREATE_WILDER } from "../services/wilders.mutation";
import { useMutation } from "@apollo/client";
interface WilderFormProps {
  onWilderCreated: () => void;
}

export default function WilderForm({ onWilderCreated }: WilderFormProps) {
  const [name, setName] = useState<IWilderInput["name"]>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [createWilder, { loading }] = useMutation(CREATE_WILDER, {
    onCompleted: () => {
      onWilderCreated();
      setName("");
      setTimeout(() => inputRef.current?.focus(), 100);
    },
    onError: () => {
      toast.error("cannot create wilder");
    },
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    createWilder({ variables: { createInput: { name } } });
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <label htmlFor="name" className="mr-2">
        <span className="mr-3">Name</span>
        <input
          ref={inputRef}
          type="text"
          maxLength={30}
          id="name"
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button type="submit" disabled={loading}>
        +
      </button>
      <br />
      <br />
    </form>
  );
}
