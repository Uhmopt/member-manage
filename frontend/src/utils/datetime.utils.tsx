import moment from "moment";

export const ymd2dmy = (dateString = "") => {
	if (!dateString) {
		return "";
	}
	const m = moment(dateString, "YYYY-MM-DD");
	return m.format("DD/MM/YYYY");
};
