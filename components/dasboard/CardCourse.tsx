import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Enroll } from "@/types/enroll";

const Star = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <path
        d="M7.05902 1.5118C7.5661 0.484341 9.03123 0.484338 9.53831 1.5118L11.0241 4.52233C11.2255 4.93034 11.6147 5.21314 12.065 5.27856L15.3873 5.76133C16.5212 5.92609 16.9739 7.31951 16.1534 8.11928L13.7494 10.4626C13.4236 10.7802 13.2749 11.2378 13.3518 11.6863L13.9193 14.9951C14.113 16.1244 12.9277 16.9856 11.9135 16.4524L8.94195 14.8902C8.53923 14.6785 8.0581 14.6785 7.65538 14.8902L4.6838 16.4524C3.66964 16.9856 2.48432 16.1244 2.67801 14.9952L3.24553 11.6863C3.32244 11.2378 3.17377 10.7802 2.84796 10.4626L0.443905 8.11928C-0.376573 7.31951 0.076175 5.92609 1.21005 5.76133L4.53237 5.27856C4.98263 5.21314 5.37187 4.93034 5.57323 4.52233L7.05902 1.5118Z"
        fill="#5DADE2"
      />
    </svg>
  );
};

const CardCourse = ({
  id,
  name,
  imageUrl,
  rating,
  totalUserProgress,
  totalSubtopics,
  linkButton,
}: Enroll) => {
  return (
    <>
      <Card key={id} className="overflow-hidden">
        <div className="w-full h-[150px] md:h-[180px]">
          <Image
            src={imageUrl}
            width={300}
            height={180}
            className="object-cover h-full w-full"
            alt="courseImg"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="text-xl md:text-2xl font-[500]">{name}</div>
            <div className="flex items-center gap-1">
              <Star />
              <p className="font-normal text-slate-400 text-xs md:text-sm">
                {" "}
                {rating}/5
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={33} />
          <p className="text-xs text-slate-500 mt-4">
            {totalUserProgress} of {totalSubtopics} Lesson Complete
          </p>
        </CardContent>
        <CardFooter>
          <Link
            href={linkButton}
            className="px-6 py-2 text-xs md:text-sm rounded-full mx-auto text-white text-center bg-[#3498DB]"
          >
            Continue Learning
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardCourse;
