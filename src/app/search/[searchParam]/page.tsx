import ProfileLayout from "@/components/Layouts/ProfileLayout";
import SearchLayout from "@/components/Layouts/SearchLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search"
}

const  SearchPage = async (props: { params: Promise<{searchParam: string}> }) => {
  const params = await props.params;
  return (
    <SearchLayout search={params.searchParam} >

    </SearchLayout>
  );
};

export default SearchPage;
