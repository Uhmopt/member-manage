// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
