import { Close, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, FC, KeyboardEvent, KeyboardEventHandler, PropsWithChildren, useState } from "react";

const SearchBox: FC<
	PropsWithChildren<{
		name?: string;
		onChange?: (p?: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLDivElement> | string) => void;
		fullWidth?: boolean;
		size?: "medium" | "small";
		variant?: "outlined" | "standard" | "filled";
		label?: "string";
	}>
> = ({ name = "", onChange = () => null, fullWidth = false, size = "medium", variant = "outlined", label = "Search" }) => {
	const [value, setValue] = useState("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e?.target?.value ?? "");
	};

	const handleSearchKey: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e?.key === "Enter") {
			if (name) {
				onChange(e);
			} else {
				onChange(value);
			}
		}
	};

	const handleCancel = () => {
		if (name) {
			onChange({ target: { name: name, value: "" } } as ChangeEvent<HTMLInputElement>);
		} else {
			onChange("");
		}
		setValue("");
	};

	return (
		<TextField
			name={name}
			value={value ?? ""}
			onChange={handleChange}
			onKeyDown={handleSearchKey}
			label={label}
			variant={variant}
			fullWidth={fullWidth}
			size={size}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						{value ? (
							<IconButton onClick={handleCancel} onMouseDown={handleCancel}>
								<Close />
							</IconButton>
						) : (
							<Search />
						)}
					</InputAdornment>
				),
			}}
			placeholder="Input and press enter"
		/>
	);
};

export default SearchBox;
