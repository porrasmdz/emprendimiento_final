import { Star, Clock, Car, ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Driver } from '../App';

type DriverCardProps = {
  driver: Driver;
  onSelect: () => void;
};

export default function DriverCard({ driver, onSelect }: DriverCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={onSelect}>
      <div className="flex items-start gap-4">
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={driver.image} alt={driver.name} />
            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {driver.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-gray-600 mb-2 flex-wrap">


            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{driver.rating}</span>
              <span className="text-xs text-gray-400">({driver.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{driver.estimatedTime} min</span>
            </div>
            <div className="flex items-center justify-between mb-1">

              <span className="text-green-600 shrink-0">${driver.price}</span>
            </div>

          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <span className="truncate">{driver.vehicle}</span>
          </div>
        </div>

      </div>
    </Card>
  );
}