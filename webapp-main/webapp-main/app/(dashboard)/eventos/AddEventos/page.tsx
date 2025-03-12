'use client'
import AdicionarEvento from '@/components/eventos/AdicionarEvento';
import AdicionarEventoFuturo from '@/components/eventos/AdicionarEventosFuturos';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <h1 className="text-2xl font-bold text-center mb-8">Gerenciar Eventos</h1>
      <div className="flex flex-col items-center space-y-6">
       <AdicionarEvento/>
        <AdicionarEventoFuturo />
      </div>
    </div>
  );
}