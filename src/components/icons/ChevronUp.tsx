import type { SVGProps } from 'react';

export function ChevronUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );
}
