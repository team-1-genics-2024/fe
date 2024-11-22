import Layout from "@/components/layout/Layout";

export default function Layout1({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Layout withNavbar>
        <main className=" mt-3">{children}</main>
      </Layout>
    </div>
  );
}
