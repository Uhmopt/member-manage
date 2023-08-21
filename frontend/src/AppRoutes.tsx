import { TokenProvider } from "context/TokenContext";
import Layout from "pages/layout";
import AuthLoginPage from "pages/login/auth-login";
import NotFoundPage from "pages/misc/NotFoundPage";
import PortfolioPage from "pages/portfolio";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const ClientOverviewPage = lazy(() => import("pages/client/overview"));

const AppRoutes = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="auth-login/:token" element={<AuthLoginPage />} />
				<Route
					path="/"
					element={
						<TokenProvider>
							<Layout />
						</TokenProvider>
					}
				>
					<Route path="/" element={<ClientOverviewPage />} />
					<Route path="portfolio" element={<PortfolioPage />} />
					{/* fallback 404 page */}
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default AppRoutes;
