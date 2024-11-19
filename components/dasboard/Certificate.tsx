import type { Certificate } from '@/app/actions/certificate';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import CardCertificate from './CardCertificate';

const Certificate = ({ certificate }: { certificate: Certificate[] }) => {
  return (
    <div className="h-[80vh] md:max-w-[800px] bg-[#F7FCFF] lg:px-12 xl:px-14 pt-6 pb-14">
      <h1 className="text-4xl font-medium mb-8 px-7">Certificate</h1>
      <ScrollArea className="px-7 h-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          {certificate.map((item, index) => (
            <CardCertificate name={item.class.name} key={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Certificate;
