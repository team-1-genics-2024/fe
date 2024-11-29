import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';

const CardCertificate = ({ key, name, id }: { key: number; name: string; id: number }) => {
  return (
    <Card key={key} className="overflow-hidden">
      <Link href={`/dashboard/certificate/${id}`}>
        <div className="w-full h-[150px] md:h-[180px]">
          <Image src={'/certificate/1.png'} width={300} height={180} className="object-cover h-full w-full" alt="courseImg" />
        </div>
        <CardContent className="p-3 pt-3">
          <h1 className="text-lg font-medium">{name}</h1>
          <p className="text-xs text-slate-500">Certificate of completion {name}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CardCertificate;
