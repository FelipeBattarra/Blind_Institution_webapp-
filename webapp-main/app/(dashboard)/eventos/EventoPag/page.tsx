"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import ArticlePage from '@/components/eventos/ArticlePage';


const Article = () => {
  
  const param = useSearchParams();
  const id = param.get('id');


  if (!id) {
    return <div>Carregando...</div>;
  }

  return <ArticlePage id={id} />;
  
};

export default Article;
