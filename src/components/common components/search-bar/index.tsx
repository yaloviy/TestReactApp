import {
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

import React, { FC, useState } from "react";
import { useAppSelector } from "../../../utils/hook/hook";
import { useNavigate } from "react-router-dom";

const SearchBarComponent: FC = (): JSX.Element => {
  const topPriceData: any = useAppSelector((state) => state.asset.topPriceData);
  const [selectedItem, SetSelectedItem] = useState<string | null>("");
  const navigate = useNavigate();

  return (
    <Stack spacing={2} sx={{ width: "300px" }}>
      <Autocomplete
        onChange={(e: any, value: string | null) =>
          navigate(`single/:${value}`)
        }
        renderInput={(el) => (
          <TextField
            {...el}
            label="Поиск..."
            inputProps={{ ...el.inputProps, type: "search" }}
          />
        )}
        options={topPriceData.map((el: { name: string }) => el.name)}
      ></Autocomplete>
    </Stack>
  );
};

export default SearchBarComponent;
