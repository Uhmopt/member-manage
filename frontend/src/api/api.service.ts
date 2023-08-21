/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { APIResponseCode, APIResponseType } from "./apiResponse";

export class APIService<T = any> {
	async gets(p?: any): Promise<APIResponseType<T[]>> {
		return new Promise((resolve, reject) => {
			resolve({ code: APIResponseCode.FAILED, message: "Not Defined (development)" });
		});
	}

	async get({ id = 0 } = {} as { id?: number }): Promise<APIResponseType<T>> {
		return new Promise((resolve, reject) => {
			resolve({ code: APIResponseCode.FAILED, message: "Not Defined (development)" });
		});
	}

	async save({ data }: { data?: T }): Promise<APIResponseType<string | boolean | T>> {
		return new Promise((resolve, reject) => {
			resolve({ code: APIResponseCode.FAILED, message: "Not Defined (development)" });
		});
	}

	async saves({ data = [] }: { data?: Array<T> }): Promise<APIResponseType<Array<string | boolean>>> {
		return new Promise((resolve, reject) => {
			resolve({ code: APIResponseCode.FAILED, message: "Not Defined (development)" });
		});
	}
	async deletes({ ids = [] }: { ids?: Array<string> }): Promise<APIResponseType<null>> {
		return new Promise((resolve, reject) => {
			resolve({ code: APIResponseCode.FAILED, message: "Not Defined (development)" });
		});
	}
}

export default new APIService();
