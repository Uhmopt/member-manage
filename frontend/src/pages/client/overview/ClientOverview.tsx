import { Divider, Grid, Typography } from "@mui/material";
import { useUser } from "context/UserContext";
import { ymd2dmy } from "utils/datetime.utils";

const ClientOverview = () => {
	const { user } = useUser();

	return (
		<div>
			<Typography variant="body2" fontWeight={700}>
				{user?.user_detail?.first_name ?? ""} {user?.user_detail?.last_name} {user?.user_detail?.uid}
			</Typography>

			<Divider sx={{ p: 1 }} />

			<Grid container spacing={2} sx={{ pt: 1 }}>
				{[
					{ label: "Email", value: user?.email },
					{ label: "Service Package", value: user?.client_detail?.service?.name ?? "" },
					{ label: "Phone", value: user?.client_detail?.phone1 },
					{ label: "Does the client require an FDS/Consent?", value: user?.client_detail?.require_fds ?? "No" },
					{ label: "Address", value: user?.client_detail?.address1 },
					{ label: "Review Frequency", value: user?.client_detail?.frequency ?? "" },
					{ label: "DOB", value: `${ymd2dmy(user?.client_detail?.birth)}` },
					{ label: "Next Review Date", value: ymd2dmy(user?.client_detail?.next_review_date) },
					{ label: "Occupation", value: user?.client_detail?.occupation?.name ?? "" },
				].map((item, itemIndex) => {
					return (
						<Grid key={itemIndex} item lg={6} md={6} sm={6} xs={12}>
							<Typography>{item.label ?? ""}</Typography>
							<Typography variant="body2" fontWeight={700}>
								{item.value ?? ""}
							</Typography>
						</Grid>
					);
				})}
			</Grid>

			<Divider sx={{ p: 1 }} />
		</div>
	);
};

export default ClientOverview;
