/* eslint-disable @typescript-eslint/no-explicit-any */
import { toNumber } from "lodash";
import moment from "moment";
import { FieldFormat, FieldRequiredType, StaticField, StaticFieldDataType } from "types/ui-base-types";

export function validatePassword(str: string): boolean {
	const pattern = /^[a-zA-Z0-9!@#$%^&*()_+~`|}{[\]:;?<>,./-=]{12,}$/;
	return pattern.test(str);
}

export function validatePhoneNumber(phoneNumber: string): boolean {
	const phoneNumberRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
	return phoneNumberRegex.test(phoneNumber);
}

export const checkValidField = ({
	data = {} as any,
	value: propsValue,
	field = {} as StaticField,
}: {
	data?: any;
	value?: any;
	field?: Partial<StaticField>;
}) => {
	if (field.required === FieldRequiredType.Required) {
		const value = propsValue ?? data?.[field?.name ?? ""];

		// text
		if (field.dataType === StaticFieldDataType.Text) {
			const formattedValue = ((value ?? "") as string).trim();
			return formattedValue.length > 0;
		}
		if (field.dataType === StaticFieldDataType.Decimal) {
			const formattedValue = ((value ?? "") as string).trim();
			return formattedValue.length > 0;
		}
		if (field.dataType === StaticFieldDataType.Integer) {
			const formattedValue = ((value ?? "") as string).trim();
			return formattedValue.length > 0;
		}
		if (field.dataType === StaticFieldDataType.MultiLineText) {
			const formattedValue = ((value ?? "") as string).trim();
			return formattedValue.length > 0;
		}
		if (field.format === FieldFormat.Phone) {
			const formattedValue = ((value ?? "") as string).trim();
			return validatePhoneNumber(formattedValue);
		}
		if (field.dataType === StaticFieldDataType.Password) {
			const formattedValue = ((value ?? "") as string).trim();
			return validatePassword(formattedValue);
		}
		if (field.dataType === StaticFieldDataType.Money) {
			const formattedValue = ((value ?? "") as string).trim();
			return !!toNumber(formattedValue);
		}

		// date time
		if (field.dataType === StaticFieldDataType.DateTime) {
			const formattedValue = ((value ?? "") as string).trim();
			return moment(formattedValue, "YYYY-MM-DDTHH:mm:ss", true).isValid();
		}

		// choice
		if (field.dataType === StaticFieldDataType.Choice) {
			if (field.format === FieldFormat.MultiSelectChoice) {
				return Array.isArray(value);
			} else {
				return !!value;
			}
		}

		// radio
		if (field.dataType === StaticFieldDataType.Radio) {
			return !!value;
		}

		// two choices
		if (field.dataType === StaticFieldDataType.TwoChoices) {
			if (field.format === FieldFormat.DropDown) {
				return !!value;
			} else if (field.format === FieldFormat.Checkbox) {
				return !!value;
			} else if (field.format === FieldFormat.Toggle) {
				return !!value;
			} else {
				return !!value;
			}
		}

		return !!value;
	}

	return true;
};
