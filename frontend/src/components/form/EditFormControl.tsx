/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, InputLabel } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { DispatchFunction, FieldFormat, StaticField, StaticFieldDataType } from "types/ui-base-types";
import EditFormControlCheckbox from "./EditFormControlCheckbox";
import EditFormControlChoice from "./EditFormControlChoice";
import EditFormControlDate from "./EditFormControlDate";
import EditFormControlDateTime from "./EditFormControlDateTime";
import EditFormControlDraggableEditList from "./EditFormControlDraggableEditList";
import EditFormControlDropdownYesNo from "./EditFormControlDropdownYesNo";
import EditFormControlMoney from "./EditFormControlMoney";
import EditFormControlMultiChoice from "./EditFormControlMultiChoice";
import EditFormControlPassword from "./EditFormControlPassword";
import EditFormControlPhone from "./EditFormControlPhone";
import EditFormControlRadio from "./EditFormControlRadio";
import EditFormControlSelectTable from "./EditFormControlSelectTable";
import EditFormControlSwitch from "./EditFormControlSwitch";
import EditFormControlText from "./EditFormControlText";
import EditFormControlTime from "./EditFormControlTime";

const EditFormControl: FC<
	PropsWithChildren<{
		data?: any;
		onChangeData?: DispatchFunction<any>;
		field?: Partial<StaticField>;
		readOnly?: boolean;
		value?: string | any;
		onChange?: DispatchFunction<any>;
		onClick?: (value?: Partial<StaticField>) => void;
		onBlur?: () => void;
		isLabel?: boolean;
		isValid?: boolean;
	}>
> = ({
	data,
	onChangeData = () => null,
	field = {} as StaticField,
	readOnly = false,
	value = "",
	onChange = () => null,
	onClick = () => null,
	onBlur = () => null,
	isLabel = true,
	isValid = true,
}) => {
	return field.dataType === StaticFieldDataType.Text ||
		field.dataType === StaticFieldDataType.Decimal ||
		field.dataType === StaticFieldDataType.Integer ||
		field.dataType === StaticFieldDataType.MultiLineText ? (
		field.format === FieldFormat.Phone ? (
			<EditFormControlPhone
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : (
			<EditFormControlText
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		)
	) : field.dataType === StaticFieldDataType.Password ? (
		<EditFormControlPassword
			field={field}
			readOnly={readOnly || field.readOnly}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			isLabel={isLabel}
			isValid={isValid}
		/>
	) : field.dataType === StaticFieldDataType.Money ? (
		<EditFormControlMoney
			field={field}
			readOnly={readOnly || field.readOnly}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			isLabel={isLabel}
			isValid={isValid}
		/>
	) : field.dataType === StaticFieldDataType.DateTime ? (
		field.format === FieldFormat.DateOnly ? (
			<EditFormControlDate
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : field.format === FieldFormat.DateAndTime ? (
			<EditFormControlDateTime
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : field.format === FieldFormat.TimeOnly ? (
			<EditFormControlTime
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : (
			<EditFormControlDate
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		)
	) : field.dataType === StaticFieldDataType.Choice ? (
		field.format === FieldFormat.MultiSelectChoice ? (
			<EditFormControlMultiChoice
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : (
			<EditFormControlChoice
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
				defaultOptionLabel={data?.[field?.optionLabelField ?? ""] ?? ""}
			/>
		)
	) : field.dataType === StaticFieldDataType.Radio ? (
		<EditFormControlRadio
			field={field}
			readOnly={readOnly || field.readOnly}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			isLabel={isLabel}
			isValid={isValid}
		/>
	) : field.dataType === StaticFieldDataType.TwoChoices ? (
		field.format === FieldFormat.DropDown ? (
			<EditFormControlDropdownYesNo
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : field.format === FieldFormat.Checkbox ? (
			<EditFormControlCheckbox
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : field.format === FieldFormat.Toggle ? (
			<EditFormControlSwitch
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		) : (
			<EditFormControlSwitch
				field={field}
				readOnly={readOnly || field.readOnly}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				isLabel={isLabel}
				isValid={isValid}
			/>
		)
	) : field.dataType === StaticFieldDataType.DraggableEditList ? (
		<EditFormControlDraggableEditList
			field={field}
			readOnly={readOnly || field.readOnly}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			isLabel={isLabel}
			// isValid={isValid}
		/>
	) : field.dataType === StaticFieldDataType.SelectTable ? (
		<EditFormControlSelectTable
			field={field}
			readOnly={readOnly || field.readOnly}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			isLabel={isLabel}
			// isValid={isValid}
		/>
	) : field.dataType === StaticFieldDataType.Custom ? (
		<div className="w-full" onClick={() => onClick(field)}>
			{field?.isLabel ?? isLabel ? <InputLabel>{field.displayName}</InputLabel> : null}
			<Box className="p-2">{field?.renderF ? field?.renderF(data, onChangeData) : field?.render ? field?.render : null}</Box>
		</div>
	) : (
		<EditFormControlText
			field={field}
			readOnly={readOnly || field.readOnly}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			isLabel={isLabel}
			isValid={isValid}
		/>
	);
};

export default EditFormControl;
