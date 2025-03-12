"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
//import { Button } from "../ui/button";


// Tipando os estados de forma adequada para TypeScript
export default function AdicionarEventoFuturo() {
  const [image, setImage] = useState<string | null>(null); // A imagem pode ser uma string (URL) ou null
  const [description, setDescription] = useState<string>(""); // Descrição como string
  const [eventDate, setEventDate] = useState<string>(""); // Data do evento como string (formato 'YYYY-MM-DD')

  // Função para lidar com a mudança de imagem
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null; // Verifica se há um arquivo
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string); // Lê o arquivo e converte para uma URL em base64
      reader.readAsDataURL(file); // Converte o arquivo para base64
    }
  };

  // Função para lidar com a mudança na descrição
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // Função para lidar com a mudança na data do evento
  const handleEventDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventDate(e.target.value);
  };

  // Função de salvar o evento
  const handleSave = () => {
    console.log("Evento futuro salvo:", { image, description, eventDate });
    setImage(null); // Limpa a imagem
    setDescription(''); // Limpa a descrição
    setEventDate(''); // Limpa a data do evento
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mx-auto border border-gray-200 mb-8 w-full md:w-128 lg:w-144">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Adicionar Evento Futuro</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-6 p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 transition duration-200 w-full"
      />
      <textarea
        placeholder="Digite uma descrição para a imagem"
        value={description}
        onChange={handleDescriptionChange}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition duration-200"
      />
      <input
        type="date"
        value={eventDate}
        onChange={handleEventDateChange}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition duration-200"
      />
      {image && (
        <div className="image-preview border border-gray-300 rounded-lg p-6 bg-gray-100">
          <img src={image} alt="Upload Preview" className="max-w-full rounded-lg mb-4" />
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
          <p className="mt-2 text-gray-600 text-sm">Data do Evento: {eventDate}</p>
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
