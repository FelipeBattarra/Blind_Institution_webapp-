import HeaderLogo from "@/components/common/header-logo";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { destroyCookie } from "nookies";
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from "@/stores/auth-store";

const HeaderModules = () => {

  const router = useRouter();
  const { token, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      // await axios.post('/api/auth/logout', { token });

      clearAuth();

      destroyCookie(null, 'token', { path: '/' });
      destroyCookie(null, 'user', { path: '/' });

      toast.success('Logout realizado com sucesso!');

      router.push('/sign-in');
    } catch (error) {
      console.error('Erro ao efetuar logout:', error);
      toast.error('Erro ao efetuar logout. Tente novamente.');
    }
  };

  return (
    <>
      <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
        <div className="max-w-screen-2xl mx-auto">
          <div className="w-full flex items-center justify-between mb-14">
            <div className="flex items-center lg:gap-x-16">
              <HeaderLogo title="Sociedade dos Cegos" />
            </div>
            <div className="flex items-center gap-x-4">
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Sair do Sistema
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderModules;
