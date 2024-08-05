import Navbar from '@/components/home/Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';

export default async function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div>
      <Navbar></Navbar>
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
}
