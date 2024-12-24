import "./searchBar.css";
import { HiLocationMarker } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { useSearch } from "../../context/SearchContext";
const SearchBar = () => {
    const { search, setSearch } = useSearch();


  return (
    <div className="container flexCenter">
      <div className="searchBar  flex items-center justify-between rounded-2xl border-[3px] py-4 px-4">
        <div className="flex gap-4">
          <HiLocationMarker size={25} color="blue" className=""/>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Enter City / Address"
            className="border-none outline-none"
          />
        </div>
        <IoSearch size={23} />
      </div>
    </div>
  );
};

export default SearchBar;
