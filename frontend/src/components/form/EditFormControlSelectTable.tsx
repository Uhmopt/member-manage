/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputLabel } from "@mui/material";
import LoaderContainer from "components/loading/LoaderContainer";
import EditTable from "components/table/edit-table";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { DispatchFunction, StaticField } from "types/ui-base-types";
import { formatArray } from "utils/array.utils";

const EditFormControlSelectTable: FC<
	PropsWithChildren<{
		field?: Partial<StaticField>;
		readOnly?: boolean;
		value?: string | any;
		onChange?: DispatchFunction<any>;
		onClick?: (value?: Partial<StaticField>) => void;
		onBlur?: () => void;
		isLabel?: boolean;
		autoFocus?: boolean;
	}>
> = ({
	field = {} as StaticField,
	readOnly = false,
	value: propsValue,
	onChange = () => null,
	onClick = () => null,
	onBlur = () => null,
	isLabel = true,
}) => {
	const getOptionValue = field.getOptionValue ?? ((option: any) => option);

	const [options, setOptions] = useState<Array<any>>([]);
	const [isLoading, setIsLoading] = useState(false);

	const label = useMemo(() => field?.displayName ?? "", [field.displayName]);
	const value = useMemo(() => {
		if (
			readOnly &&
			formatArray(propsValue).length > 0 &&
			!(typeof formatArray(propsValue)?.[0] === "string") &&
			!(typeof formatArray(propsValue)?.[0] === "number")
		) {
			return formatArray(propsValue);
		}

		return formatArray(propsValue).map((propsValueItem) => {
			const gotPropsValue = getOptionValue(propsValueItem);
			const tValue =
				typeof propsValueItem === "string" || typeof propsValueItem === "number"
					? propsValueItem
					: typeof gotPropsValue === "string" || typeof gotPropsValue === "number"
					? gotPropsValue
					: propsValueItem?.id ?? propsValueItem?._id;

			return (options ?? []).find((option) => {
				const gotOptionValue = getOptionValue(option);
				const optionValue =
					typeof option === "string" || typeof option === "number"
						? option
						: typeof gotOptionValue === "string" || typeof gotOptionValue === "number"
						? gotOptionValue
						: option?.id ?? option?._id;

				return (
					(typeof optionValue === "number" || typeof optionValue === "string") &&
					(typeof tValue === "number" || typeof tValue === "string") &&
					optionValue === tValue
				);
			});
		});
	}, [propsValue, options]);

	const handleChange: (value: any) => void = (v) => {
		onChange(formatArray(v).map((item) => getOptionValue(item)));
	};

	const loadOptions = async () => {
		if (field.getOptions) {
			setIsLoading(true);
			const ret = await field.getOptions();
			setOptions(ret);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!field.getOptions && field.options?.length) {
			setOptions(field.options);
		}
		if (field.getOptions && !field.options?.length) {
			loadOptions();
		}
	}, [field]);

	return (
		<div onClick={() => onClick(field)}>
			{isLabel ? <InputLabel>{label}</InputLabel> : null}
			<LoaderContainer open={isLoading} style={{ height: 300 }}>
				<EditTable
					data={options ?? []}
					selectedRows={value}
					onSelectRows={handleChange}
					columns={field.columns}
					rowSelection={field.rowSelection}
					readOnly={readOnly}
					idSelector={getOptionValue}
				/>
			</LoaderContainer>
		</div>
	);
};

export default EditFormControlSelectTable;
