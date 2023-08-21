/* eslint-disable @typescript-eslint/no-explicit-any */
export type EquixToken = {
	refreshToken?: string;
	deviceID?: string;
	user_type?: string;
};

export enum EquixSymbol {
	ANZ = "ANZ",
}

export enum EquixExchange {
	ASX = "ASX",
}

export type EquixSymbolInfo = {
	symbol: EquixSymbol;
	class: string;
	code: string;
	display_name: string;
	company: string;
	status: string;
	exchanges: Array<string>;
	country: string;
	contract_unit: any;
	contract_months: any;
	listing_date: any;
	min_price_movement: any;
	last_trading_day: any;
	cash_settlement_price: any;
	trading_hours: any;
	settlement_day: any;
	position_limit: any;
	daily_price_limit: any;
	cftc_approved: any;
	updated: string;
	company_name: string;
	GICS_industry_group: any;
	list_trading_market: Array<string>;
	trading_halt: number;
	currency: string;
	ISIN: string;
	display_exchange: string;
	last_halt: number;
	last_haltlift: number;
	type: number;
	display_master_code: string;
	display_master_name: any;
	master_code: string;
	master_name: any;
	expiry_date: any;
	first_noti_day: any;
	security_name: any;
	origin_symbol: string;
	available_region: any;
	coupon_rate: any;
	days_to_expiration: any;
	leaps: any;
	maturity_date: any;
	options_multiple_deliverables: any;
	options_premium_multiplier: any;
	root_option_symbol: any;
	sic: any;
	strike_price: any;
	naics: any;
	security_sub_type: any;
	contract_size: any;
	expiration_cycle: any;
	option_type: any;
	option_style: any;
	step_price: any;
	step_volume: any;
	status_note: string;
};

export type EquixResPageData<T = any> = {
	total_count?: number;
	total_pages?: number;
	current_page?: number;
	data?: Array<T>;
};

export type EquixAccount = {
	account_id: string;
	account_name: string;
	currency: string;
	address_line_1: any;
	email: any;
	mobile_phone: any;
	fax: any;
	status: string;
	cqg_account_status: string;
	sources: any;
	hin: any;
	advisor_code: string;
	broker_id: any;
	pid: any;
	client_type: any;
	driver_licence: any;
	date_created: any;
	trading_account: any;
	work_phone: any;
	warrants_trading: any;
	options_trading: any;
	branch: string;
	om_equix_status: string;
	actor: string;
	last_update: number;
	actor_market: string;
	last_update_market: number;
	us_market: number;
	au_market: number;
	organisation_code: string;
	advisor_name: string;
	address_line_2: any;
	address_line_3: any;
	address_line_4: any;
	home_phone: any;
	account_type: any;
	branch_code: string;
	international_trading: any;
	equities_brokerage_schedule: any;
	options_brokerage_schedule: any;
	bank_institution_code: any;
	bsb: any;
	bank_account_number: any;
	bank_account_name: any;
	bank_transaction_type: any;
	account_designation: any;
	contractnote_email_address: any;
	post_code: any;
	country_code: any;
	cross_reference: any;
	source: string;
	equity_trading: any;
	future_trading: any;
	margin_flag: any;
	contact_phone: any;
	business_registration_code: any;
	corporate_taxpayer_identification_number: any;
	margin_account: any;
	representative_name: any;
	date_of_birth: any;
	personal_papers_type: any;
	personal_papers_number: any;
	date_granted_identity_papers: any;
	commission_name: string;
	address: string;
};

export type EquixUpdatedAmount = {
	amount: number;
	updated: number;
};

export type EquixSymbolValues = {
	[key in EquixSymbol]: number;
};

export type EquixPortfolio = {
	account_id: string;
	total_market_value: number;
	cash_balance: number;
	securities_at_cost: number;
	total_profit_amount: number;
	total_profit_percent: number;
	cash_available: number;
	cash_available_au: number;
	cash_available_us: number;
	available_balance: number;
	cash_balance_after_settlement: number;
	account_balance: number;
	total_today_change_amount: number;
	total_today_change_percent: number;
	future_open_order_fee: number;
	futures_cost_to_close: number;
	equities_cost_to_close: number;
	cost_to_close: number;
	pl_of_margin: number;
	pl_of_margin_lme: number;
	value_of_position: number;
	account_value: number;
	not_available_as_margin_collateral: number;
	initial_margin_available: number;
	maintenance_margin_available: number;
	initial_margin_impact: number;
	initial_margin_impact_convert: number;
	initial_margin_reserved: number;
	initial_margin_reserved_convert: number;
	maintenance_margin_reserved: number;
	maintenance_margin_reserved_convert: number;
	margin_utilisation: number;
	margin_ratio: any;
	max_withdrawal_amount: number;
	cash_at_bank: number;
	pending_buy_order: number;
	pending_settlement: number;
	pending_settlement_t0: number;
	pending_settlement_t1: number;
	pending_settlement_t2: number;
	pending_settlement_tother: number;
	pending_settlement_future: number;
	account_name: string;
	realized_pl: number;
	realized_pl_lme: number;
	pending_sell_order: number;
	sell_open_order: number;
	open_order: number;
	status: {
		sod_cash: boolean;
	};
	future_fee: number;
	net_exposure: number;
	available_balance_au: number;
	available_balance_us: number;
	netbalance: EquixUpdatedAmount;
	netexposure_ws: EquixUpdatedAmount;
	nontrading: EquixUpdatedAmount;
	trading: EquixUpdatedAmount;
	unfilledbuys_ws: EquixUpdatedAmount;
	value: EquixSymbolValues;
	upnl: EquixSymbolValues;
	profitVal: EquixSymbolValues;
	profitPercent: EquixSymbolValues;
	today_change_val: EquixSymbolValues;
	today_change_percent: EquixSymbolValues;
	positions: Array<EquixPosition>;
};

export type EquixPosition = {
	account_id: string;
	symbol: string;
	display_name: string;
	average_price: number;
	cost: number;
	currency: string;
	exchange: string;
	style: string;
	updated: number;
	volume: number;
	book_value: number;
	book_cost: number;
	side: EquixSide;
	group_code: string;
	type: string;
	account_name: string;
	commodity_info: any;
	master_code: string;
	class: string;
	indicative_price: any;
	country: string;
	security_name: any;
	company_name: string;
	contract_size: any;
	min: number;
	max: number;
	last: number;
	quantity: number;
	market_price: number;
	today_change_val: number;
	today_change_percent: number;
	previous_value: number;
	value: number;
	profit_percent: number;
	upnl: number;
	value_convert: number;
	book_cost_convert: number;
	book_value_convert: number;
	rate: EquixRate;
};

export type EquixRate = {
	rate: number;
	operator: string;
};

export enum EquixSide {
	Ask = "Ask",
	Bid = "Bid",
}

export type EquixSideDepth = {
	[key: string]: EquixDepthInfo;
};

export type EquixDepth = {
	[key: string]: EquixSideDepth;
};

export type EquixDepthInfo = {
	symbol: EquixSymbol;
	side: EquixSide;
	quantity: number;
	number_of_trades: number;
	price: number;
	exchanges: EquixExchange;
};

export type EquixQuote = {
	exchange: EquixExchange;
	symbol: EquixSymbol;
	ask_price: number;
	ask_size: number;
	bid_price: number;
	bid_size: number;
	change_percent: number;
	change_point: number;
	close: number;
	high: number;
	low: number;
	open: number;
	trade_price: number;
	trade_size: number;
	updated: number;
	volume: number;
	previous_close: number;
	value_traded: number;
	indicative_price: any;
	open_interest: any;
	implied_volatility: any;
	break_even: any;
	break_even_percent: any;
	in_the_money: any;
	delta: any;
	vega: any;
	theta: any;
	gamma: any;
	rho: any;
	"5d_change_percent": any;
	price_lower_1: any;
	price_lower_2: any;
	price_higher_1: any;
	price_higher_2: any;
	long_lower_1: any;
	long_lower_2: any;
	long_higher_1: any;
	long_higher_2: any;
	short_lower_1: any;
	short_lower_2: any;
	short_higher_1: any;
	short_higher_2: any;
	number_of_trades: number;
	market_cap: any;
	theo_price: any;
	iv_change: any;
};

export type EquixTrade = {
	price: number;
	quantity: number;
	id: number;
	time: number;
};

export type EquixTrades = {
	[key: string]: EquixTrade;
};

export type EquixCosDepthPrice = {
	exchange: EquixExchange;
	symbol: EquixSymbol;
	depth: EquixDepth;
	quote: EquixQuote;
	trades: EquixTrades;
};

export type EquixOrder = {
	account_id: string;
	account_name: string;
	actor_changed: string;
	advisor_code: string;
	avg_price: number;
	broker_order_id: string;
	client_order_id: string;
	company_name: string;
	condition_name: any;
	current_brokerage: number;
	current_tax: number;
	current_value: number;
	destination: string;
	device_info: string; // json
	display_order_id: string;
	duration: string;
	estimated_brokerage: number;
	estimated_tax: number;
	estimated_value: number;
	exchange: EquixExchange;
	exchange_updated: number;
	expire_date: any;
	filled_quantity: number;
	init_time: number;
	is_buy: number;
	is_not_insert_detail: any;
	is_stoploss: number;
	leave_quantity: number;
	limit_price: number;
	market_price: any;
	modify_order_id: any;
	order_action: string; // json
	order_state: string;
	order_status: number;
	order_tag: string;
	order_type: string;
	order_type_origin: string;
	order_value: number;
	origin_broker_order_id: string;
	origination: number;
	passed_state: string; // json
	reject_reason: any;
	sort_field: number;
	specific_symbol: any;
	stop_price: any;
	symbol: EquixSymbol;
	trading_market: string;
	trail_amount: any;
	trail_percent: any;
	updated: number;
	user_login: string;
	volume: number;

	order_detail_id: number;
};

export type EquixNews = {
	link: string;
	link_paritech: any;
	news_id: string;
	page_count: number;
	sign: string; // json
	source: string;
	status: string;
	symbol: string;
	tag: string; // json
	title: string;
	trading_halt: number;
	type_news: string;
	updated: string;
	user_readed: any;
};
