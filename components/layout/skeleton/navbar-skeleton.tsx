import { Skeleton } from "@/components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <section className="w-full max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center gap-8">
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex gap-12">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5 block sm:hidden" />{" "}
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default NavbarSkeleton;
