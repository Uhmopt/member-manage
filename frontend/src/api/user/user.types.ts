import { DBRecord } from "api/api.types";
import { ClientDetail } from "../client/client.types";

export interface User extends DBRecord {
	name: string;
	email: string;
	password?: string;
	uid?: string;
	user_type_id?: number;
	share_email?: string;
	user_detail_type?: string;

	user_detail_id?: number;
	user_detail?: UserDetail;

	client_detail?: ClientDetail;

	licensee_detail_id?: number;
	adviser_detail_id?: number;
	peer_detail_id?: number;
	client_detail_id?: number;
	adviser_id?: number;
	is_multi_factor_verification?: boolean;
	is_share?: boolean;
	afsl_id?: number;
}

export type UserDetail = ClientDetail;
