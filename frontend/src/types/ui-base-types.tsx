/* eslint-disable @typescript-eslint/no-explicit-any */

import { GridSize } from "@mui/material";
import { ColDef } from "ag-grid-community";
import { ReactNode } from "react";

export interface DispatchFunction<T = any> {
	// (value: T | ((p: T) => T), name?: string): void;
	(value: T, name?: string): void;
}
export interface FormatFunction<T> {
	(value: T, name?: string): T;
}

export type UIMenuData = {
	label?: string;
	name?: string;
	path?: string;
	absPath?: string;

	data?: Array<UIMenuData>;

	parent?: UIMenuData;
};

export type UIJwtToken = {
	exp?: number;
	iat?: number;
	iss?: string; // origin
	jti?: string; // ?
	nbf?: number;
	prv?: string; // ?
	sub?: number; // user id
};

export enum UIColorUnion {
	primary = "primary",
	secondary = "secondary",
	success = "success",
	error = "error",
	info = "info",
	warning = "warning",
}

export enum FieldFormat {
	// TwoChoices
	DropDown = "Drop Down",
	Checkbox = "Checkbox",
	Toggle = "Toggle",

	// Text
	Text = "Text",
	Email = "Email",
	URL = "URL",
	Age = "Age",
	Phone = "Phone",

	// Datetime
	DateOnly = "Date Only",
	DateAndTime = "Date and Time",
	TimeOnly = "Time Only",

	// Decimal

	// Integer
	None = "None",
	TimeDuration = "Time Duration",
	WholeNumber = "Whole Number",

	// Lookup

	// Money

	// Choice
	Choice = "Choice",
	MultiSelectChoice = "Multi-select Choice",
}

export enum StaticFieldDataType {
	TwoChoices = 0,
	Text = 1,
	DateTime = 2,
	Decimal = 3,
	Integer = 4,
	Lookup = 5,
	Money = 6,
	Choice = 7,
	MultiLineText = 9,

	// custom
	DraggableEditList = -1,
	Custom = -2,
	Radio = -7,
	SelectTable = -30,
	Password = -99,
}

export enum FieldRequiredType {
	Optional = 0,
	Recommended = 1,
	Required = 2,
}

export interface StaticField {
	name: string;
	displayName: string;

	dataType: StaticFieldDataType;
	format?: FieldFormat;

	required: FieldRequiredType;

	placeholder?: string | boolean;
	errorMessage?: string;

	// for select fields
	disableIfNoOption?: boolean;
	options?: Array<any>;
	getOptions?: () => Promise<Array<any>>;
	getOptionLabel?: (option: any) => string;
	getOptionValue?: (option: any) => any;
	setOptionValue?: (option: any) => any;

	// for table fields
	columns?: Array<ColDef>;
	rowSelection?: "single" | "multiple";
	fields?: Array<Partial<StaticField>>;

	// readOnly
	readOnly?: boolean;
	readOnlyEdit?: boolean;

	// hide/show
	isHide?: boolean | ((p?: any) => boolean);

	// grid size
	lg?: GridSize | false;
	md?: GridSize | false;
	sm?: GridSize | false;
	xs?: GridSize | false;
	flexGrow?: 0 | 1;

	// for custom render
	render?: ReactNode;
	renderF?: (p?: any, onChange?: DispatchFunction) => ReactNode;

	// for choice
	optionLabelField?: string;

	// show label
	isLabel?: boolean;
}

export interface ActionBarButton {
	icon: string;
	title: string;
	action: () => void;

	id?: string;
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;

	showWhenSelected?: boolean;
	hideWhenSelected?: boolean;

	isConfirm?: boolean;
	message?: ReactNode;

	hidden?: boolean;

	order?: number;
}

export enum ActionBarButtonId {
	ADD = "ADD",
	EDIT = "EDIT",
	CLONE = "CLONE",
	DELETE = "DELETE",
}
