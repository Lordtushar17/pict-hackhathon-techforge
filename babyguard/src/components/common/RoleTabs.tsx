// src/components/common/RoleTabs.tsx
import React from 'react';

type Role = 'parent' | 'hospital';

interface RoleTabsProps {
  role: Role;
  onChange: (role: Role) => void;
}

const RoleTabs: React.FC<RoleTabsProps> = ({ role, onChange }) => {
  return (
    <div className="inline-flex rounded-full bg-slate-800 p-1">
      {(['parent', 'hospital'] as Role[]).map((r) => {
        const isActive = role === r;
        return (
          <button
            key={r}
            type="button"
            onClick={() => onChange(r)}
            className={[
              'px-4 py-1 text-xs sm:text-sm rounded-full transition-all',
              isActive
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            ].join(' ')}
          >
            {r === 'parent' ? 'Parent Login' : 'Hospital Login'}
          </button>
        );
      })}
    </div>
  );
};

export default RoleTabs;
