import { DBRecord } from "api/api.types";

export interface ITable extends DBRecord {
	display_name?: string;
}
