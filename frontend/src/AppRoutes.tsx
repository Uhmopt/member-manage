import Layout from "pages/layout";
import AuthLoginPage from "pages/login/auth-login";
import NotFoundPage from "pages/misc/NotFoundPage";
import TablesPage from "pages/tables";
import TablePage from "pages/tables/table-page";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="auth-login/:token" element={<AuthLoginPage />} />
				<Route path="/" element={<Layout />}>
					<Route path="tables" element={<TablesPage />} />
					<Route path="tables/:table_id" element={<TablePage />} />
					{/* fallback 404 page */}
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
