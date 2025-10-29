import { IconButton, Input } from "@mui/joy";
import { ChangeEvent, useRef, useState } from "react";
import { Iconify, Centered } from "@ffilip/mui-react-utils/components";
import C180Form from "./C180Form";

interface IProps {
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

interface ISBProps {
  onClick: VoidFunction;
}

interface IDBProps {
  onClick: VoidFunction;
  show: boolean;
}



const SearchButton = ({ onClick }: ISBProps) => (
  <IconButton onClick={onClick} sx={{ opacity: 0.8 }}>
    <Iconify icon="fa-solid:search" />
  </IconButton>
);


const DeleteButton = ({ onClick, show }: IDBProps) => (
  <IconButton onClick={onClick} color="primary" sx={{ pointerEvents: show ? "all" : "none" }}>
    {show && <Iconify width={10} icon="streamline:delete-1-solid" />}
  </IconButton>
);



function SearchField({ onChange, onSubmit }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearch(value);
    onChange(value);
  };


  const handleSubmit = () => {
    const trimmedSearch = search.trim();
    setSearch(trimmedSearch);
    onSubmit(trimmedSearch);
  };


  const handleDelete = () => {
    inputRef.current?.focus();
    setSearch("");
    onChange("");
  };


  return (
    <Centered>
      <C180Form onSubmit={handleSubmit}>
        <Input
          slotProps={{
            input: { ref: inputRef }
          }}
          value={search}
          name="stats-search"
          placeholder="Search all fields..."
          onChange={handleChange}
          sx={{ minHeight: 40, px: 2, }}
          startDecorator={<SearchButton onClick={handleSubmit} />}
          endDecorator={<DeleteButton onClick={handleDelete} show={!!search} />}
        />
      </C180Form>
    </Centered>
  );
}



export default SearchField;