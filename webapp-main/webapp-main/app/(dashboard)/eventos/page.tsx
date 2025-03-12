"use client"
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import moment from "moment-timezone";
import axios from "axios";
import Aviso from "@/components/eventos/Aviso";
//import EditTable from "@/components/eventos/EditTable";
//import AddEventPage from "@/components/eventos/AddEventPage";
import { FaCalendarAlt, FaCalendarPlus,FaListUl } from "react-icons/fa";
import EditGeral from "@/components/eventos/EditGeral";

function Home() {
    const [event, setEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const [auxEvent, setAuxEvent] = useState(null);

    const actualPath = usePathname();
    const path = actualPath ? actualPath.split('/')[1] : '';
    const basePath = path ? `/${path}` : '';

    const router = useRouter();

    function editHandler() {
        const today = moment().tz('America/Sao_Paulo').subtract(3, 'hours').format('YYYY-MM-DD');
        const auxDate = {
            id: null,
            date: today,
            description: null
        };
        setAuxEvent(auxDate);
        setEditOpen(true);
        setIsModalOpen(false);
    }

    useEffect(() => {
        const checkEvent = async () => {
            if (sessionStorage.getItem("Opened") != "true") {
                const today = moment().tz('America/Sao_Paulo').subtract(3, 'hours').toDate();
                const lastYearDate = moment(today).subtract(1, 'year').format('YYYY-MM-DD');
                try {
                    const response = await axios.get('http://localhost:3001/calendario');
                    const event = response.data.find(event => event.date === lastYearDate);
                    if (event) {
                        setEvent(event);
                        setIsModalOpen(true);
                    }
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            }
        };
        checkEvent();
    }, []);

    return (
        <div className="grid grid-cols-7 gap-20">
            <Card className="size-48 ml-10 mt-10 cursor-pointer" onClick={() => router.push(`${basePath}/Calendario`)}>
                <CardContent className="flex flex-col items-center justify-center py-10 mt-3">
                    <FaCalendarAlt className="text-primary"size={64} />
                    <h1 className="mt-3 font-bold">Calendario</h1>
                </CardContent>
            </Card>
            <Card className="size-48 ml-10 mt-10 cursor-pointer" onClick={() => router.push(`${basePath}/AddEventos`)}>
                <CardContent className="flex flex-col items-center justify-center py-10 mt-3">
                    <FaCalendarPlus className="text-primary"size={62}/>
                    <h1 className="mt-3 font-bold text-center">Adicionar eventos</h1>
                </CardContent>
            </Card>
            <Card className="size-48 ml-10 mt-10 cursor-pointer" onClick={() => router.push(`${basePath}/TodosEventos`)}>
                <CardContent className="flex flex-col items-center justify-center py-10 mt-3">
                    <FaListUl className="text-primary"size={62}/>
                    <h1 className="mt-3 font-bold text-center">Todos os Eventos</h1>
                </CardContent>
            </Card>


            {isModalOpen && event && (
                <Aviso event={event} onClose={() => setIsModalOpen(false)} onClick={editHandler} />
            )}
            {isEditOpen && (
                <EditGeral event={auxEvent} onClose={() => setEditOpen(false)} />
            )}
        </div>
    );
};

export default Home;
