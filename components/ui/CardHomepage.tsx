"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Button } from "./button";

interface CardProps {
  foto: string;
  title: string;
  date: string;
  participants: string;
  rating: string;
  status: string;
}

const CardHomepage: React.FC<CardProps> = ({
  foto,
  title,
  date,
  participants,
  rating,
  status,
}): JSX.Element => {
  return (
    <Card className="w-[350px] shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        <div className="w-full h-[200px] relative ">
          <Image
            src={foto}
            alt={title}
            width={400}
            height={300}
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{date}</p>
              <p className="text-sm text-gray-500">{participants} Peserta</p>
            </div>
            <div className="items-start">
              <div className="flex flex-row items-center mt-2">
                <div className="mr-1">
                  <Image
                    src="/image/homepage/rating.png"
                    alt="Left Star"
                    width={15}
                    height={15}
                  />
                </div>
                <div>
                  <p className="text-gray-400 font-semibold">{rating}/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end mr-0 p-2 mb-2">
        <Button className="mt-4 bg-blue-400 text-white py-2  rounded-full hover:bg-blue-300">
          {status}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardHomepage;
