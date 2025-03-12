"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";
import { IoPersonSharp, IoCalendarSharp, IoAlertCircleSharp } from "react-icons/io5";

export default function DashboardPage() {
  const router = useRouter();
  const actualPath = usePathname();
  const path = actualPath ? actualPath.split('/')[1] : '';
  const basePath = path ? `/${path}` : '';

  const searchParams = useSearchParams();

  const retornaPagina = (href: string) => {
    router.push(href);
  };

  const usuarios = () => {
    retornaPagina(`${basePath}/relatorios/cadastros`)
  };

  const agendamentos = () => {
    retornaPagina(`${basePath}/relatorios/agendamentos`)
  };

  const problemas = () => {
    retornaPagina(`${basePath}/relatorios/problemas`)
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className='relative w-full flex justify-center mb-10'>
          <h2 className='text-2xl font-bold'>Relatórios</h2> 
        </div>
        <div className='w-full flex justify-around mb-10'>
            <Button variant="ghost" className='rounded-lg shadow-[0_0_15px_-3px_rgba(0,0,0,0.2),_0_0_15px_-4px_rgba(0,0,0,0.2)] py-10 font-bold gap-1 text-xl w-2/5 h-3/4' onClick={usuarios}> <IoPersonSharp /> Cadastros</Button>
            <Button variant="ghost" className='rounded-lg shadow-[0_0_15px_-3px_rgba(0,0,0,0.2),_0_0_15px_-4px_rgba(0,0,0,0.2)] py-10 font-bold gap-1 text-xl w-2/5 h-3/4' onClick={agendamentos}><IoCalendarSharp /> Agendamentos</Button>
        </div>
      </div>
    </div>
  );
}
