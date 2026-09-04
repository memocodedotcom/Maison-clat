import React from 'react';
import { FlaskConical } from 'lucide-react';

export const DemoBanner: React.FC = () => (
  <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-[11px] text-amber-950" role="status">
    <span className="inline-flex items-center gap-2">
      <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
      <strong>Démonstration produit</strong>
      <span className="hidden sm:inline">— données fictives, actions et disponibilités simulées jusqu’à la connexion des services réels.</span>
    </span>
  </div>
);
