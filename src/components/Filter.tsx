import { useState } from "react";
import { Popover } from "@mui/material";
import { Check, ChevronDown, Search } from "tabler-icons-react";

type Option = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  options: Option[];
  selectedOrbit: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Filter = ({ options, selectedOrbit, onChange, placeholder = "Orbiting Body" }: FilterSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setSearch("");
  };

  const handleSelect = (value: string) => {
    onChange(value);
    handleClose();
  };
  const buttonText = selectedOrbit ? `${placeholder} (${selectedOrbit})` : placeholder;
  const buttonClasses = selectedOrbit
    ? "bg-blue-500 text-white border-blue-500"  
    : "bg-white text-gray-700 border-gray-300";

  return (
    <div className="relative w-56">
      <button
        onClick={handleOpen}
        className={`flex items-center justify-between w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses}`}
      >
        <span>{buttonText}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        marginThreshold={0} 
      >
        <div className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search*/}
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Type to search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Options */}
          <ul className="max-h-40 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                >
                  <span>{opt.label}</span>
                  {selectedOrbit === opt.value && <Check className="w-4 h-4 text-blue-500" />}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No results</li>
            )}
          </ul>
        </div>
      </Popover>
    </div>
  );
};

export default Filter;
