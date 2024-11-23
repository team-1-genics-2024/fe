import Layout from "@/components/layout/Layout";
import PaymentCard from "./component/PaymentCard";
import Image from "next/image";

export default function PaymentPage() {
  return (
    <Layout withNavbar withFooter withPadding>
      <main className="flex relative min-h-[80vh] md:min-h-[60vh] items-center flex-col ">
        <div className="absolute top-[5%] right-[10%] hidden md:block">
          <Image
            src="/image/payment/star-right.png"
            alt="Right Star"
            width={40}
            height={40}
          />
        </div>
        <div className="absolute bottom-4 left-10 hidden md:block">
          <Image
            src="/image/payment/star-left.png"
            alt="Left Star"
            width={70}
            height={70}
          />
        </div>
        <div className="absolute bottom-[15%] left-32 hidden md:block lg:hidden -z-50">
          <Image
            src="/image/payment/star-left2.png"
            alt="Left2 Star"
            width={100}
            height={100}
          />
        </div>

        <p className="md:mt-10 text-[32px] ">Const and Benefits</p>
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
