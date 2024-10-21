import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchSchema = z.object({
    content: z.string().min(1, "Content is not empty")
  });
  
type SearchData = z.infer<typeof SearchSchema>;

export default function SearchBar({filterText, onFilterTextChange}) {
    const { data: session } = useSession();
  const {
    register,
  } = useForm<SearchData>({
    resolver: zodResolver(SearchSchema),
  });

    return (
      <form>
        <div>
            <textarea
              {...register("content")}
                value={filterText} 
                placeholder="" 
                onChange={(e) => onFilterTextChange(e.target.value)}
                className="w-full p-2 border rounded"
            />
        </div>
      </form>
    );
  }
  