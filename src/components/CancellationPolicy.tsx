import { AlertTriangle, Clock, DollarSign, XCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type CancellationPolicyProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  price: number;
};

export default function CancellationPolicy({
  isOpen,
  onClose,
  onAccept,
  price
}: CancellationPolicyProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Política de Cancelación
          </DialogTitle>
          <DialogDescription>
            Lee las condiciones antes de confirmar tu viaje
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Cancellation Rules */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-amber-900 mb-3">
              <Clock className="w-4 h-4" />
              Reglas de Cancelación
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span><strong>Gratis:</strong> Más de 30 minutos antes del viaje</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">⚠</span>
                <span><strong>50% del costo:</strong> 15-30 minutos antes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✗</span>
                <span><strong>100% del costo:</strong> Menos de 15 minutos o no show</span>
              </li>
            </ul>
          </div>

          {/* Penalty System */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-red-900 mb-3">
              <XCircle className="w-4 h-4" />
              Sistema de Penalización
            </h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• <strong>1ra cancelación tardía:</strong> Advertencia</li>
              <li>• <strong>2da cancelación:</strong> Suspensión de 24 horas</li>
              <li>• <strong>3+ cancelaciones:</strong> Suspensión de 7 días</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-900">
                <DollarSign className="w-4 h-4" />
                <span>Precio del viaje:</span>
              </div>
              <span className="text-green-600">${price}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={onAccept}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Entiendo y acepto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
