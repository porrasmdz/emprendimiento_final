import { useState } from 'react';
import { CreditCard, Banknote, ArrowLeftRight, ChevronRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export type PaymentMethod = 'card' | 'cash' | 'transfer';

type PaymentMethodOption = {
  id: PaymentMethod;
  name: string;
  icon: React.ReactNode;
  description: string;
};

const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'card',
    name: 'Tarjeta',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Tarjeta de crédito o débito'
  },
  {
    id: 'cash',
    name: 'Efectivo',
    icon: <Banknote className="w-5 h-5" />,
    description: 'Pago en efectivo al conductor'
  },
  {
    id: 'transfer',
    name: 'Transferencia',
    icon: <ArrowLeftRight className="w-5 h-5" />,
    description: 'Transferencia bancaria'
  }
];

type PaymentMethodSelectorProps = {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
};

export default function PaymentMethodSelector({ 
  selectedMethod, 
  onMethodChange 
}: PaymentMethodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentMethod = paymentMethods.find(m => m.id === selectedMethod);

  const handleSelect = (method: PaymentMethod) => {
    onMethodChange(method);
    setIsOpen(false);
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
            {currentMethod?.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm">Método de pago</p>
            <span>{currentMethod?.name}</span>
          </div>
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Cambiar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px] rounded-t-3xl">
            <SheetHeader className="mb-6">
              <SheetTitle>Selecciona método de pago</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleSelect(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedMethod === method.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    selectedMethod === method.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {method.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className={selectedMethod === method.id ? 'text-blue-900' : ''}>
                        {method.name}
                      </span>
                      {selectedMethod === method.id && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      selectedMethod === method.id ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {method.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {selectedMethod === 'card' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  💳 Tu tarjeta •••• 4242 será cargada al final del viaje
                </p>
              </div>
            )}

            {selectedMethod === 'transfer' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  📱 Recibirás los datos bancarios del conductor al finalizar
                </p>
              </div>
            )}

            {selectedMethod === 'cash' && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-900">
                  💵 Asegúrate de llevar el monto exacto o cambio
                </p>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
}
