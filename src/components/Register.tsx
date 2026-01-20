import { useState } from 'react';
import { Mail, User, Car, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

type RegisterProps = {
  onComplete: () => void;
};

type Step = 1 | 2 | 3;
type Role = 'passenger' | 'driver' | null;

export default function Register({ onComplete }: RegisterProps) {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(null);
  const [emailError, setEmailError] = useState('');

  const validateInstitutionalEmail = (email: string): boolean => {
    // Validar correo institucional (ejemplo: @espol.edu.ec)
    const institutionalDomains = ['@espol.edu.ec', '@fiec.espol.edu.ec'];
    return institutionalDomains.some(domain => email.toLowerCase().endsWith(domain));
  };

  const handleEmailSubmit = () => {
    if (!email) {
      setEmailError('Por favor ingresa tu correo institucional');
      return;
    }
    
    if (!validateInstitutionalEmail(email)) {
      setEmailError('Debes usar tu correo institucional (@espol.edu.ec)');
      return;
    }

    setEmailError('');
    setStep(2);
  };

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setStep(3);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-white mb-2">PoliDrive</h1>
          <p className="text-blue-200">Carpool verificado para la comunidad ESPOL</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-white mb-2">
            <span>Paso {step} de 3</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-blue-700" />
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <Card className="p-6 bg-white/95 backdrop-blur">
            <div className="mb-6 text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h2 className="mb-2">Pre-registro rápido</h2>
              <p className="text-gray-600">
                Ingresa tu correo institucional para comenzar
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="tu.nombre@espol.edu.ec"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                  className={emailError ? 'border-red-500' : ''}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Verificación institucional:</strong> Solo estudiantes y personal de ESPOL pueden registrarse
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleEmailSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continuar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Role Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-white mb-2">Selecciona tu rol</h2>
              <p className="text-blue-200">¿Cómo quieres usar PoliDrive?</p>
            </div>

            <Card 
              className="p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-white/20 hover:border-blue-400 bg-white/95 backdrop-blur"
              onClick={() => handleRoleSelect('passenger')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Pasajero</h3>
                  <p className="text-gray-600">
                    Encuentra viajes compartidos con miembros verificados de ESPOL
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-2xl transition-all cursor-pointer border-2 border-white/20 hover:border-green-400 bg-white/95 backdrop-blur"
              onClick={() => handleRoleSelect('driver')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">Conductor</h3>
                  <p className="text-gray-600">
                    Ofrece viajes compartidos y comparte gastos de traslado
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            </Card>

            <Button 
              variant="ghost"
              onClick={() => setStep(1)}
              className="w-full text-white hover:bg-white/10"
            >
              Volver
            </Button>
          </div>
        )}

        {/* Step 3: Driver Benefits or Confirmation */}
        {step === 3 && role === 'driver' && (
          <Card className="p-6 bg-white/95 backdrop-blur">
            <div className="mb-6 text-center">
              <Car className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h2 className="mb-2">Quiero ser conductor</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-green-900 mb-2">✓ Beneficios</h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Comparte gastos de combustible</li>
                  <li>• Ayuda a la comunidad ESPOL</li>
                  <li>• Horarios flexibles y rutas propias</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-blue-900 mb-2">📋 Responsabilidades</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Puntualidad en horarios acordados</li>
                  <li>• Comunicación clara con pasajeros</li>
                  <li>• Vehículo en buen estado</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-amber-900 mb-2">⭐ Tu reputación importa</h3>
                <p className="text-amber-800">
                  Las calificaciones y puntualidad afectan tu visibilidad en la plataforma
                </p>
              </div>
            </div>

            <Button 
              onClick={onComplete}
              className="w-full bg-green-600 hover:bg-green-700 mb-3"
            >
              Continuar registro como conductor
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setStep(2)}
              className="w-full"
            >
              Volver
            </Button>
          </Card>
        )}

        {step === 3 && role === 'passenger' && (
          <Card className="p-6 bg-white/95 backdrop-blur">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="mb-2">¡Registro exitoso!</h2>
              <p className="text-gray-600">
                Tu correo {email} ha sido verificado
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <Badge className="bg-blue-600 mb-2">Usuario Verificado</Badge>
              <p className="text-sm text-gray-700">
                Tu perfil será verificado dentro de 24 horas. Recibirás un correo de confirmación.
              </p>
            </div>

            <Button 
              onClick={onComplete}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continuar al inicio de sesión
            </Button>
          </Card>
        )}

        <p className="text-center text-white/60 mt-6 text-sm">
          Al registrarte, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}
