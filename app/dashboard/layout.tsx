import Navigation from '@/components/layout/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Navigation />
      <div className="absolute bg-[#EBF5FB]  h-full hidden xl:block w-[15vw] 2xl:w-[30vw] left-0"></div>
      <main className="max-w-[1440px] mx-auto mt-24">{children}</main>
    </div>
  );
}
