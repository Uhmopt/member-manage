// build checker
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const APP_NAME = "RB Member Manage";

export const HOST = window?.location?.host ?? "rb.member.manage"; // default rb.member.manage

export const LIVE_APP_BASE = `https://rb.member.manage`;

export const API_BASE = `${IS_DEVELOPMENT ? "http://localhost:8000" : LIVE_APP_BASE}/api/v1`;
