import { Alert } from "@mui/material";
import { APIResponseCode } from "api/apiResponse";
import userService from "api/user/user.service";
import { User } from "api/user/user.types";
import { useSnackbar } from "notistack";
import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { DispatchFunction } from "types/ui-base-types";
import { useToken } from "./TokenContext";

type UserContextType = {
	user: User;
	setUser: DispatchFunction<User>;
	isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export const UserProvider: React.FC<PropsWithChildren<{ relations?: Array<string> }>> = ({ children, relations = [] }) => {
	const { enqueueSnackbar } = useSnackbar();

	const { token } = useToken();
	const userId = useMemo(() => token?.sub ?? 0, [token]);

	const [user, setUser] = useState<User>({} as User);
	const [isLoading, setIsLoading] = useState(false);

	const loadData = async () => {
		setIsLoading(true);
		const res = await userService.get({ id: userId, relations });

		if (res.code === APIResponseCode.SUCCESS) {
			setUser((res.data ?? {}) as User);
		} else {
			enqueueSnackbar(res.message, { variant: "warning" });
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (userId > 0) {
			loadData();
		}
	}, [userId]);

	return (
		<UserContext.Provider value={{ user, setUser, isLoading }}>
			{isLoading ? <Alert color="info">Loading ...</Alert> : children}
		</UserContext.Provider>
	);
};
