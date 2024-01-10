"use client";
import { SearchIcon, X } from "lucide-react";
import qs from "query-string";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!value) return;
    e.preventDefault();
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };
  return (
    <div className="flex w-full border justify-center">
      <form
        className="flex  relative w-full md:w-[500px]"
        onSubmit={handleSubmit}
      >
        <Input
          className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-r-none"
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        {value && (
          <X
            className="absolute top-1.5 right-14 cursor-pointer text-muted-foreground"
            onClick={onClear}
          />
        )}
        <Button size="sm" variant="secondary" type="submit">
          <SearchIcon className="w-5 h-5 text-muted-foreground" />
        </Button>
      </form>
    </div>
  );
};

export default Search;
