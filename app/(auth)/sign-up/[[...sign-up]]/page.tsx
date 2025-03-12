import SignUpForm from '@/components/compras-e-orcamentos/sign-up-form';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-muted-foreground text-[#2E2A47]">
            Bem vindo de volta!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Faça login ou crie uma conta para acessar ao seu dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <SignUpForm />
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.png" alt="logo" height={100} width={100} />
      </div>
    </div>
  );
}
