import { User, Car, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

type LoginProps = {
  onLogin: (type: 'user' | 'driver') => void;
};

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-white mb-3">PoliDrive</h1>
          <p className="text-blue-200">Carpool verificado para la comunidad ESPOL</p>
          <Badge className="mt-3 bg-green-600">
            Usuario Verificado ESPOL
          </Badge>
        </div>

        <div className="space-y-5">
          <Card 
            className="p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-white/20 hover:border-blue-400 bg-white/95 backdrop-blur"
            onClick={() => onLogin('user')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 mb-1">Iniciar como Pasajero</h2>
                <p className="text-gray-600">
                  Encuentra viajes compartidos con miembros verificados
                </p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Continuar como Pasajero
            </Button>
          </Card>

          <Card 
            className="p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-white/20 hover:border-green-400 bg-white/95 backdrop-blur"
            onClick={() => onLogin('driver')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 mb-1">Iniciar como Conductor</h2>
                <p className="text-gray-600">
                  Ofrece viajes compartidos y comparte gastos
                </p>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Continuar como Conductor
            </Button>
          </Card>
        </div>

        <p className="text-center text-white/60 mt-10 text-sm">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}