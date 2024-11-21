import Image from 'next/image';
import { Card, CardContent } from '../ui/card';

const CardCertificate = ({ key, name }: { key: number; name: string }) => {
  return (
    <Card key={key} className="overflow-hidden">
      <div className="w-full h-[150px] md:h-[180px]">
        <Image src={'/certificate/1.png'} width={300} height={180} className="object-cover h-full w-full" alt="courseImg" />
      </div>
      <CardContent className="p-3 pt-3">
        <h1 className="text-lg font-medium">{name}</h1>
        <p className="text-xs text-slate-500">Certificate of completion {name}</p>
      </CardContent>
    </Card>
  );
};

export default CardCertificate;