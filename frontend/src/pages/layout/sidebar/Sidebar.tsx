import { Box, Typography } from "@mui/material";
import ScrollContainer from "components/containers/ScrollContainer";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
	return (
		<Box
			sx={{ background: (theme) => theme.palette.primary.main, width: 160, height: "100%", color: (theme) => theme.palette.common.white }}
		>
			<Typography variant="body2" fontWeight={700} sx={{ px: 3, py: 1 }}>
				My Details
			</Typography>
			<ScrollContainer>
				<SidebarMenu
					data={[
						{ label: "Overview", name: "Overview", path: "" },
						{
							label: "Key Details",
							name: "Key Details",
							path: "",
							data: [
								{ label: "Basic Information", name: "Basic Information", path: "" },
								{ label: "Contact Details", name: "Contact Details", path: "" },
								{ label: "Identification", name: "Identification", path: "" },
								{ label: "Client Group", name: "Client Group", path: "" },
								{ label: "Client Entity", name: "Client Entity", path: "" },
								{ label: "Financial & Insurance Position", name: "Financial & Insurance Position", path: "" },
								{ label: "Status - Marital, Resident, Tax & Birth Place", name: "Status - Marital, Resident, Tax & Birth Place", path: "" },
								{ label: "Children & Dependents", name: "Children & Dependents", path: "" },
								{ label: "Health Details", name: "Health Details", path: "" },
								{ label: "Employment", name: "Employment", path: "" },
								{ label: "Cashflow", name: "Cashflow", path: "" },
								{ label: "Lifestyle Goals & Planned Future Expenses", name: "Lifestyle Goals & Planned Future Expenses", path: "" },
								{ label: "Goals", name: "Goals", path: "" },
								{ label: "Risk Profile", name: "Risk Profile", path: "" },
								{ label: "Superannuation Contributions", name: "Superannuation Contributions", path: "" },
								{ label: "Retirement Planning", name: "Retirement Planning", path: "" },
								{ label: "Insurance Needs Analysis", name: "Insurance Needs Analysis", path: "" },
								{ label: "Estate Planning", name: "Estate Planning", path: "" },
								{ label: "Centerlink", name: "Centerlink", path: "" },
								{ label: "Stock Broking Details", name: "Stock Broking Details", path: "" },
								{ label: "Professional Advisers", name: "Professional Advisers", path: "" },
								{ label: "Service Package", name: "Service Package", path: "" },
								{ label: "Reviews", name: "Reviews", path: "" },
								{ label: "Lead/Referral Source", name: "Lead/Referral Source", path: "" },
							],
						},
						{
							label: "Administration",
							name: "Administration",
							path: "",
							data: [
								{ name: "Revenue Mapping", label: "Revenue Mapping", path: "" },
								{ name: "Phone Log", label: "Phone Log", path: "" },
								{ name: "Email", label: "Email", path: "" },
								{ name: "SMS Log", label: "SMS Log", path: "" },
								{ name: "Client Notes", label: "Client Notes", path: "" },
								{ name: "Tasks", label: "Tasks", path: "" },
								{ name: "Documents", label: "Documents", path: "" },
							],
						},
					]}
				/>
			</ScrollContainer>
		</Box>
	);
};

export default Sidebar;
