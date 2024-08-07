import Image from 'next/image';
import logo from './home/icon';
import { cn } from '@/lib/utils';

export default function Logo<
  W extends number | `${number}` | undefined,
  H extends number | `${number}` | undefined
>({ width, height, className }: { width: W; height: H; className?: string }) {
  return (
    <Image
      src={logo}
      width={width}
      height={height}
      alt="Logo"
      className={cn(className)}></Image>
  );
}
