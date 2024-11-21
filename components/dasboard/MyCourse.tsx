import { ScrollArea } from '@radix-ui/react-scroll-area';

const MyCourse = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-[100vh] md:h-[80vh] md:max-w-[800px] bg-[#F7FCFF] lg:px-12 xl:px-14 pt-6 pb-14 ">
      <h1 className="text-4xl font-medium mb-8 px-7">My Course</h1>
      <ScrollArea className="px-7 h-[90%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">{children}</div>
      </ScrollArea>
    </div>
  );
};

export default MyCourse;
