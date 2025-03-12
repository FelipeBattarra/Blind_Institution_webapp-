"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";

// Definindo os tipos dos estados
export default function AdicionarEvento() {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  // Tipo para o evento de mudança da imagem
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string); // Especificando que será uma string
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    console.log("Evento salvo:", { title, image, description });
    setTitle("");
    setImage(null);
    setDescription("");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mx-auto border border-gray-200 mb-8 w-full md:w-128 lg:w-144">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Adicionar Evento Passado
      </h2>
      <input
        type="text"
        placeholder="Digite o título do evento"
        value={title}
        onChange={handleTitleChange}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition duration-200"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-6 p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 transition duration-200 w-full"
      />
      <input
        type="text"
        placeholder="Digite uma descrição para a imagem"
        value={description}
        onChange={handleDescriptionChange}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition duration-200"
      />
      {image && (
        <div className="image-preview border border-gray-300 rounded-lg p-6 bg-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <img
            src={image}
            alt="Upload Preview"
            className="max-w-full rounded-lg mb-4"
          />
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
        </div>
      )}
      <Button
        onClick={handleSave}
        className="w-full py-3"
        >
        Salvar
      </Button>
    </div>
  );
}