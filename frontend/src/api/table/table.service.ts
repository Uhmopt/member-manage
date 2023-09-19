import { APIService } from "api/api.service";
import { APIResponseCode, APIResponseType } from "api/apiResponse";
import { AxiosError } from "axios";
import { formatArray } from "utils/array.utils";
import axiosInstance from "utils/axios.utils";
import { ITable } from "./table.types";

const basePath = "table";

class TableService extends APIService<ITable> {
	async gets(
		{ ids = [], relations = [] } = {} as { ids?: Array<number | string>; relations?: Array<string> },
	): Promise<APIResponseType<ITable[]>> {
		try {
			const { data } = await axiosInstance.post(`${basePath}/get`, { ids, relations });
			return { code: APIResponseCode.SUCCESS, data: formatArray<ITable>(data), message: "Success" } as APIResponseType<Array<ITable>>;
		} catch (error) {
			const axiosError = error as AxiosError<APIResponseType>;
			if (axiosError.response?.data) {
				return {
					code: axiosError?.response?.data?.code ?? APIResponseCode.FAILED,
					data: axiosError?.response?.data?.data,
					message: axiosError?.response?.data?.message ?? "Error",
				} as APIResponseType;
			}
			return { code: APIResponseCode.FAILED, message: "Network Connection Problem" };
		}
	}

	async get({ id = 0, relations = [] } = {} as { id?: number; relations?: Array<string> }): Promise<APIResponseType<ITable>> {
		try {
			const { data } = await axiosInstance.post(`${basePath}/show/${id}`, { relations });
			return { code: APIResponseCode.SUCCESS, data: data as ITable, message: "Success" } as APIResponseType<ITable>;
		} catch (error) {
			const axiosError = error as AxiosError<APIResponseType>;
			if (axiosError.response?.data) {
				return {
					code: axiosError?.response?.data?.code ?? APIResponseCode.FAILED,
					data: axiosError?.response?.data?.data,
					message: axiosError?.response?.data?.message ?? "Error",
				} as APIResponseType;
			}
			return { code: APIResponseCode.FAILED, message: "Network Connection Problem" };
		}
	}

	async save({ data }: { data?: ITable }): Promise<APIResponseType<ITable>> {
		const { id, ...submitData } = data ?? {};
		try {
			const { data: res } = await axiosInstance.post(!id ? `${basePath}/store` : `${basePath}/update/${id}`, {
				data: submitData,
			});
			return {
				code: APIResponseCode.SUCCESS,
				data: res as ITable,
				message: "Success",
			} as APIResponseType<ITable>;
		} catch (error) {
			const axiosError = error as AxiosError<APIResponseType>;
			if (axiosError.response?.data) {
				return {
					code: axiosError?.response?.data?.code ?? APIResponseCode.FAILED,
					data: axiosError?.response?.data?.data,
					message: axiosError?.response?.data?.message ?? "Error",
				} as APIResponseType;
			}
			return { code: APIResponseCode.FAILED, message: "Network Connection Problem" };
		}
	}

	async delete({ id = 0 } = {} as { id?: number }): Promise<APIResponseType<boolean>> {
		try {
			const { data: res } = await axiosInstance.post(`${basePath}/delete/${id}`);
			return {
				code: APIResponseCode.SUCCESS,
				data: res as boolean,
				message: "Success",
			} as APIResponseType<boolean>;
		} catch (error) {
			const axiosError = error as AxiosError<APIResponseType>;
			if (axiosError.response?.data) {
				return {
					code: axiosError?.response?.data?.code ?? APIResponseCode.FAILED,
					data: axiosError?.response?.data?.data,
					message: axiosError?.response?.data?.message ?? "Error",
				} as APIResponseType;
			}
			return { code: APIResponseCode.FAILED, message: "Network Connection Problem" };
		}
	}
}

export default new TableService();
