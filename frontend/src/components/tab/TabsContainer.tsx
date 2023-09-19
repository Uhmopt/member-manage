import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { FC, PropsWithChildren, ReactNode, useEffect, useMemo } from "react";

const TabsContainer: FC<
	PropsWithChildren<{
		data?: Array<{ label: string; node?: ReactNode }>;
		width?: number;
		onChange?: (t: number) => void;
		value?: number;
	}>
> = ({ data = [], onChange = () => null, width = 0, value: propsValue = 0 }) => {
	const [value, setValue] = React.useState(0);

	const selectedNode = useMemo(() => data?.find((tab, tabIndex) => tabIndex === value), [data, value]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		onChange(newValue);
	};

	useEffect(() => {
		setValue(propsValue);
	}, [propsValue]);

	return data.length ? (
		<Stack spacing={1} height="100%" sx={{ backgroundColor: "white", borderRadius: "12px" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange}>
					{data.map((tab, tabIndex) => (
						<Tab key={tabIndex} label={tab.label} />
					))}
				</Tabs>
			</Box>
			<Box flexGrow={1} height={width ? width : "100%"} overflow="auto">
				{selectedNode?.node ?? null}
			</Box>
		</Stack>
	) : null;
};

export default TabsContainer;
