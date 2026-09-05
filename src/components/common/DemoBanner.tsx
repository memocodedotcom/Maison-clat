import React from 'react';
import { FlaskConical } from 'lucide-react';
import { appEnvironment } from '../../config/environment';

export const DemoBanner: React.FC = () => appEnvironment.demoMode ? (
  <div className="border-b border-[#d5b975]/20 bg-[#111113] px-4 py-2 text-center text-[11px] text-[#d8c89f]" role="status">
    <span className="inline-flex items-center gap-2">
      <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
      <strong>Démonstration produit</strong>
      <span className="hidden sm:inline">— données fictives, actions et disponibilités simulées jusqu’à la connexion des services réels.</span>
    </span>
  </div>
) : null;
