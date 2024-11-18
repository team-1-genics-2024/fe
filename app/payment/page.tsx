import Layout from "@/components/layout/Layout";
import PaymentCard from "./components/PaymentCard";

export default function PaymentPage() {
  return (
    <Layout withNavbar withFooter withPadding>
      <main className="flex justify-center items-center flex-col ">
        <p className="mt-6 text-[32px] ">Const and Benefits</p>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <PaymentCard
            header="1 month subscription (30 Days)"
            price="1500000"
          />
          <PaymentCard
            header="1 year subscription (365 Days)"
            price="12600000"
          />
        </div>
      </main>
    </Layout>
  );
}
