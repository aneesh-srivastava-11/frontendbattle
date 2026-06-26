import type { SVGProps } from 'react';

export function ChartPie(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
      </g>
    </svg>
  );
}
