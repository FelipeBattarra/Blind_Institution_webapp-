import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LuCheckCircle } from "react-icons/lu";

interface ConfirmationPopupProps {
    title: string;
    subtitle: string;
    onTimeout: () => void; // Função que será chamada após o timeout
  }
  
  // Usamos `forwardRef` para expor a função handleOpen
  const ConfirmationPopup = forwardRef(({ title, subtitle, onTimeout }: ConfirmationPopupProps, ref) => {
    const [open, setOpen] = useState(false);
  
    // Expondo a função handleOpen para o componente pai
    useImperativeHandle(ref, () => ({
      handleOpen() {
        setOpen(true);
      }
    }));

    useEffect(() => {
      if (open) {
        const timer = setTimeout(() => {
          setOpen(false);
          onTimeout();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [open, onTimeout]);
  
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent aria-describedby=''>
            <DialogHeader className="flex flex-col items-center text-center">            
                <DialogTitle className="mt-4">{title}</DialogTitle>
                <p className="mt-2 text-sm">{subtitle}</p>
                <LuCheckCircle size={50} color="green" />
            </DialogHeader>
            <style jsx>{`
                    button.absolute.right-4.top-4 {
                        display: none;
                    }
                `}</style>
            </DialogContent>
        </Dialog>
    );
  });
  
  // Definindo explicitamente o nome do componente
  ConfirmationPopup.displayName = 'ConfirmationPopup';
  
  export default ConfirmationPopup;