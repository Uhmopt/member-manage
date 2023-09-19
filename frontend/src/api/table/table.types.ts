import { DBRecord } from "api/api.types";

export interface ITable extends DBRecord {
	displayName?: string;
}
