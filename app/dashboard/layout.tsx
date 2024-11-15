import Layout from '@/components/layout/Layout';

export default function Layout1({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Layout withNavbar>
        {/* <div className="absolute bg-[#EBF5FB]  h-full hidden xl:block w-[15vw] 2xl:w-[30vw] left-0"></div> */}
        <main className=" mt-3">{children}</main>
      </Layout>
    </div>
  );
}
