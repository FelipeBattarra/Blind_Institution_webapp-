"use client" // Indica que o arquivo é parte de um projeto React que está sendo servido no lado do cliente.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

/* Componente funcional que exibe a página de um artigo específico.
recebe um id que passado pela pagina mãe (localizada em (dashboard)/eventos/EventoPag) que consequentemente recebeu o paramentro usando next/link com o formato 
 <Link href={{
            pathname: 'EventoPag',
            query: { id: evento.id },
          }}>
  onde evento é um objeto recebido da tabela eventos
  pathname deve levar a pagina que contem o componente ArticlePage
  para mais informações consulte EventoPag
*/
const ArticlePage = ({ id }) => {
  // Definindo os estados para armazenar os dados do artigo e possíveis erros.
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  // useEffect é utilizado para buscar os dados do artigo assim que o componente é montado.
  useEffect(() => {
    // Faz uma requisição GET para buscar os dados do artigo pelo ID.
    axios.get(`http://localhost:3001/calendario/${id}`)
      .then(response => {
        // Se a requisição for bem-sucedida, armazena os dados do artigo no estado.
        setArticle(response.data);
      })
      .catch(error => {
        // Se ocorrer um erro na requisição, armazena a mensagem de erro no estado.
        console.error('Erro ao buscar o artigo:', error);
        setError('Artigo não encontrado');
      });
  }, [id]); // O useEffect depende do ID do artigo.

  // Renderiza uma mensagem de erro se ocorrer um erro na requisição.
  if (error) {
    return <div className="container mx-auto p-4 text-red-500 text-center">{error}</div>;
  }

  // Renderiza uma mensagem de carregamento enquanto os dados do artigo não são recebidos.
  if (!article) {
    return <div className="container mx-auto p-4 text-center">Carregando...</div>;
  }

  // Desestrutura os campos do artigo para facilitar o acesso.
  const { txtTitle, autor, body, publish } = article;

  // Se o artigo não estiver publicado, exibe uma mensagem adequada.
  if (!publish) {
    return <div className="container mx-auto p-4 text-center">Esse evento ainda não possui um artigo</div>;
  }

  // Renderiza o conteúdo do artigo, incluindo um carrossel de imagens.
  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{txtTitle}</h1>
      <p className="text-gray-600 mb-6 text-center">Por {autor}</p>
      <Carousel>
        <CarouselContent className="overflow-hidden rounded-lg shadow-md">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="w-full h-40 md:h-60 lg:h-72">
              <img
                src={`https://via.placeholder.com/800x400?text=Image+${index + 1}`}
                alt={`Placeholder ${index + 1}`}
                className="w-full h-full object-cover rounded-lg max-w-screen-sm mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700" />
      </Carousel>
      <div className="article-body mt-6 text-gray-800 leading-relaxed">{body}</div>
    </div>
  );
};

export default ArticlePage;
