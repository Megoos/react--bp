import React from 'react';

const ComponentADesktopLazy = React.lazy(() => import('./ComponentADesktop'));
const ComponentAMobileLazy = React.lazy(() => import('./ComponentAMobile'));

export interface Props {
  variant: 'mobile' | 'desktop';
}

const ComponentA: React.FC<Props> = ({ variant }) => {
  return (
    <React.Suspense fallback={null}>
      {variant === 'mobile' ? <ComponentAMobileLazy /> : <ComponentADesktopLazy />}
    </React.Suspense>
  );
};

export default ComponentA;
