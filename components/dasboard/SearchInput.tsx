import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  className?: string;
  menuOpen?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  className,
  menuOpen,
  ...props
}: SearchInputProps) {
  return (
    <div className={`relative mx-5 ${menuOpen ? "" : "w-3 md:w-auto"}`}>
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        {...props}
        className={`pl-8 ${className}`}
        type="search"
        placeholder="Search..."
      />
    </div>
  );
}
