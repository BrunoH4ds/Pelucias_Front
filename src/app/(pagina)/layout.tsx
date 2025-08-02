// src/app/(pagina)/layout.tsx
import Main from '@/components/template/Main';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Main>{children}</Main>
    </div>
  );
}
