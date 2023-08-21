import React, { FC, PropsWithChildren, useEffect, useState } from "react";

const AuthLogin: FC<PropsWithChildren<{ email?: string; password?: string }>> = ({ email = "", password = "" }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (email = "", password = "") => {
		setIsLoading(true);
	};

	useEffect(() => {
		if (email && password) {
			handleLogin(email, password);
		}
	}, [email, password]);

	return (
		<div>
			{isLoading ? "Loading ..." : ""}
			{email}
			{password}
		</div>
	);
};

export default AuthLogin;
