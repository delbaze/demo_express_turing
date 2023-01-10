import React, { useState, FormEvent, useRef } from "react";
import { IWilder, IWilderInput } from "../types/IWilder";
import { createWilder } from "../services/wilders";
import toast from "react-hot-toast";

interface WilderFormProps {
  onWilderCreated: (w: IWilder) => void;
}

export default function WilderForm({ onWilderCreated }: WilderFormProps) {
  const [name, setName] = useState<IWilderInput["name"]>("");
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setProcessing(true);
      onWilderCreated(await createWilder({ name }));
      setName("");
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      toast.error("cannot create wilder");
    } finally {
      setProcessing(false);
    }
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
          disabled={processing}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button type="submit" disabled={processing}>
        +
      </button>
      <br />
      <br />
    </form>
  );
}
