import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type RatingDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string, categories: string[]) => void;
  driverName: string;
};

const RATING_CATEGORIES = [
  { id: 'punctuality', label: 'Puntual', icon: '⏰' },
  { id: 'communication', label: 'Buena comunicación', icon: '💬' },
  { id: 'safe', label: 'Conducción segura', icon: '🛡️' },
  { id: 'friendly', label: 'Amable', icon: '😊' },
  { id: 'clean', label: 'Vehículo limpio', icon: '✨' },
  { id: 'music', label: 'Buena música', icon: '🎵' },
];

export default function RatingDialog({
  isOpen,
  onClose,
  onSubmit,
  driverName
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, review, selectedCategories);
      // Reset form
      setRating(0);
      setReview('');
      setSelectedCategories([]);
      onClose();
    }
  };

  const charCount = review.length;
  const maxChars = 120;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Califica tu viaje</DialogTitle>
          <DialogDescription>
            ¿Cómo fue tu experiencia con {driverName}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Calificación general</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating === 5 && '¡Excelente!'}
                {rating === 4 && 'Muy bueno'}
                {rating === 3 && 'Bueno'}
                {rating === 2 && 'Regular'}
                {rating === 1 && 'Necesita mejorar'}
              </p>
            )}
          </div>

          {/* Quick Categories */}
          {rating > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-3">¿Qué destacarías? (opcional)</p>
              <div className="flex flex-wrap gap-2">
                {RATING_CATEGORIES.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Comment */}
          {rating > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Comentario (opcional)</p>
                <span className={`text-xs ${charCount > maxChars ? 'text-red-600' : 'text-gray-400'}`}>
                  {charCount}/{maxChars}
                </span>
              </div>
              <Textarea
                placeholder="Comparte tu experiencia en pocas palabras..."
                value={review}
                onChange={(e) => setReview(e.target.value.slice(0, maxChars))}
                className="resize-none"
                rows={3}
              />
              <p className="text-xs text-gray-400 mt-1">
                Máximo {maxChars} caracteres
              </p>
            </div>
          )}

          {/* Info */}
          {rating === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <ThumbsUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Tu calificación ayuda a mantener la calidad de PoliDrive y 
                  permite a otros usuarios tomar mejores decisiones.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Saltar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            Enviar calificación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
