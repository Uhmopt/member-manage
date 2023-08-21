import { DBRecord } from "api/api.types";
import { ServicePackage } from "api/servicePackage/servicePackage.types";

export interface ClientDetail extends DBRecord {
	first_name?: string;
	last_name?: string;
	birth?: string;
	email?: string;
	company_name?: string;
	company_ACN?: string;
	SMSFName?: string;
	SMSFABN?: string;
	primary_contact?: string;
	phone1?: string;
	phone1_type?: string;
	phone2?: string;
	address1?: string;
	address1_type?: string;
	address2?: string;
	mail_address1?: string;
	mail_address2?: string;
	mail_per_address?: string;
	fax_number?: string;
	alter_name?: string;
	alter_email?: string;
	suburb?: string;
	state?: string;
	postcode?: string;
	phone_office?: string;
	email_office?: string;
	mail_suburb?: string;
	mail_state?: string;
	mail_postcode?: string;
	verify_send_time?: string;
	verify_do_time?: string;
	identification_file?: string;
	avatar?: string;
	frequency_charged?: string;
	charge_method?: string;
	next_anniversary?: string;
	soa_date?: string;
	reasons_for_advice?: string;
	foreseeable_changes?: string;
	adviser_mapped?: string;
	gender?: string;
	occupation?: Occupation;
	related_clients?: string;
	current_related?: string;
	combine_client?: string;
	partner_id?: string;
	yodlee_name?: string;
	salutation?: string;
	entities?: string;
	ignore_entities?: string;
	ignore_children?: string;
	ignore_id_verification?: string;
	share?: UserShare;
	share_tmd?: string;
	share_pds?: string;
	share_video?: string;

	sales_person_id?: string;
	cso_id?: string;
	client_status_id?: string;
	lead_source_id?: string;
	locality?: string;
	region1?: string;
	region2?: string;
	uid?: string;
	service_package_id?: string;
	fee_anniversary_date?: string;
	next_review_date?: string;
	frequency?: string;
	important_information?: string;
	important_information_note?: string;
	platform?: string;
	require_fds?: string;
	anniversary?: string;
	middle_name?: string;
	preferred_name?: string;
	maiden_name?: string;
	last_previous_name?: string;

	service?: ServicePackage;
}

export type Occupation = {
	id?: string;
	name?: string;
};

export type UserShare = {
	InsuranceModule?: boolean;
	ResidentialInvestmentLoan?: boolean;
	ResidentialOwnerOccupiedLoan?: boolean;
	SMSFModule?: boolean;
	ShareTradingModule?: boolean;
	SuperannuationModule?: boolean;
};
