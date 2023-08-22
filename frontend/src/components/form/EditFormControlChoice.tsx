/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Autocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	Box,
	CircularProgress,
	FormHelperText,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { FC, FocusEventHandler, PropsWithChildren, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { DispatchFunction, FieldRequiredType, StaticField } from "types/ui-base-types";
import { checkValidField } from "./editFormUtils";

const EditFormControlChoice: FC<
	PropsWithChildren<{
		field?: Partial<StaticField>;
		readOnly?: boolean;
		value?: string | any;
		onChange?: DispatchFunction<any>;
		onClick?: (value?: Partial<StaticField>) => void;
		onBlur?: () => void;
		isLabel?: boolean;
		autoFocus?: boolean;
		defaultOptionLabel?: string;
		isValid?: boolean;
		defaultDisplayValue?: string;
	}>
> = ({
	field = {} as StaticField,
	readOnly = false,
	value: propsValue,
	onChange = () => null,
	onClick = () => null,
	onBlur = () => null,
	isLabel = true,
	autoFocus = false,
	defaultOptionLabel = "",
	isValid: propsIsValid = true,
	defaultDisplayValue = "",
}) => {
	const ref = useRef<HTMLInputElement>(null);

	const errorMessage = useMemo(() => field.errorMessage ?? "This field is required", [field.errorMessage]);

	const getOptionLabel = field.getOptionLabel ?? ((option: any) => (typeof option === "string" ? option : option?.displayName ?? ""));
	const getOptionValue = field.getOptionValue ?? ((option: any) => option);

	const [options, setOptions] = useState<Array<any>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isValid, setIsValid] = useState(true);

	const label = useMemo(() => field?.displayName ?? "", [field.displayName]);
	const insideValue = useMemo(() => {
		const gotPropsValue = typeof propsValue === "string" || typeof propsValue === "number" ? propsValue : getOptionValue(propsValue);
		const tValue =
			typeof gotPropsValue === "string" || typeof gotPropsValue === "number" ? gotPropsValue : propsValue?.id ?? propsValue?._id;

		return tValue;
	}, [propsValue]);

	const value = useMemo(() => {
		if (readOnly && propsValue && !(typeof propsValue === "string") && !(typeof propsValue === "number")) {
			return propsValue;
		}

		const tValue = insideValue;

		return (options ?? []).find((option) => {
			const gotOptionValue = typeof option === "string" || typeof option === "number" ? option : getOptionValue(option);
			const optionValue =
				typeof gotOptionValue === "string" || typeof gotOptionValue === "number" ? gotOptionValue : option?.id ?? option?._id;

			return (
				(typeof optionValue === "number" || typeof optionValue === "string") &&
				(typeof tValue === "number" || typeof tValue === "string") &&
				optionValue === tValue
			);
		});
	}, [propsValue, options, insideValue]);

	const renderValue = useMemo(
		() => getOptionLabel(value) || getOptionLabel(propsValue) || defaultDisplayValue,
		[value, propsValue, defaultDisplayValue],
	);

	const handleChange: (
		event: SyntheticEvent<Element, Event>,
		value: any,
		reason: AutocompleteChangeReason,
		details?: AutocompleteChangeDetails<any> | undefined,
	) => void = (e, v) => {
		onChange(getOptionValue(v));
	};

	const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
		onBlur();
		if (field.required === FieldRequiredType.Required) {
			setIsValid(checkValidField({ field, value: e?.target?.value ?? "" }));
		}
	};

	const handleOpen = async () => {
		if (!options.length) {
			if (field.getOptions) {
				setIsLoading(true);
				const ret = await field.getOptions();
				setOptions(ret);
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		if (!field.getOptions && field.options) {
			setOptions(field.options);
		}
	}, [field]);

	useEffect(() => {
		if (ref.current && autoFocus && !readOnly) {
			ref.current.focus();
		}
	}, [ref, autoFocus, readOnly]);

	useEffect(() => {
		setIsValid(propsIsValid);
	}, [propsIsValid]);

	return readOnly ? (
		<div className="w-full" onClick={() => onClick(field)}>
			{isLabel ? <InputLabel>{label}</InputLabel> : null}
			<Box className="p-2">
				<Typography sx={{ minHeight: "1rem" }} fontWeight={600}>
					{renderValue || defaultOptionLabel}
				</Typography>
			</Box>
			{isValid ? null : <FormHelperText error>{isValid ? "" : errorMessage}</FormHelperText>}
		</div>
	) : (
		<div className="w-full" onClick={() => onClick(field)}>
			{isLabel ? <InputLabel>{label}</InputLabel> : null}
			<Autocomplete
				loading={isLoading}
				value={value ?? null}
				onChange={handleChange}
				options={options ?? []}
				renderInput={(params) => {
					return (
						<TextField
							{...params}
							inputRef={ref}
							placeholder={
								field.placeholder === true ? `Enter ${(field.displayName ?? "").toLowerCase()}` : field.placeholder ? field.placeholder : ""
							}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{isLoading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
							onBlur={handleBlur}
							error={!isValid}
							helperText={isValid ? "" : errorMessage}
							label={isLabel ? undefined : label}
						/>
					);
				}}
				size="small"
				getOptionLabel={getOptionLabel}
				fullWidth
				disabled={field.disableIfNoOption && !options?.length}
				onOpen={handleOpen}
				inputValue={isEmpty(options) && insideValue ? defaultOptionLabel : renderValue}
			/>
		</div>
	);
};

export default EditFormControlChoice;
