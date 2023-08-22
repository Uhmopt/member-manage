import { DBRecord } from "api/api.types";
import { StaticField } from "types/ui-base-types";

export interface Field extends DBRecord {
	data?: StaticField;
}
