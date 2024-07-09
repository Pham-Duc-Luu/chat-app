import Image from 'next/image';
import logo from './home/icon';

export default function Logo<
  W extends number | `${number}` | undefined,
  H extends number | `${number}` | undefined
>({ width, height }: { width: W; height: H }) {
  return <Image src={logo} width={width} height={height} alt="Logo"></Image>;
}
