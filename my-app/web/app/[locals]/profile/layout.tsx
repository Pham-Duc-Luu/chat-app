import Navbar from '@/components/home/Navbar';

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
      {children}
    </div>
  );
}
