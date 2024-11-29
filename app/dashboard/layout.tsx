import Layout from "@/components/layout/Layout";

export default function Layout1({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Layout withNavbar>
        <main>{children}</main>
      </Layout>
    </div>
  );
}
