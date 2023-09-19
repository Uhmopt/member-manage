import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

// material-ui

// state

//types

// project imports
import { RowClickedEvent, RowDoubleClickedEvent } from "ag-grid-community";
import { APIResponseCode } from "api/apiResponse";
import { isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ActionBarButton, ActionBarButtonId, DispatchFunction } from "types/ui-base-types";
import { EditTableManageProps, OnSaveNames } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useEditTableManage<T = any>(props: PropsWithChildren<EditTableManageProps>) {
	const {
		apiService,
		title = "",

		queryData = {},
		initFormData = {} as T,
		columns = [],

		formatOnChange = (value: T, name?: string) => value,
		formatOnEdit = (value: T) => value,

		isInitLoad = true,
		preData = [],

		rowSelection = "multiple",
		enableSubRoute = false,
		forceSubRouteMode = false,

		onLoad,
		onDbClickRow = () => null,
		onOpenEdit = () => null,
		onSelect = () => null,

		preventOpenEdit = false,

		onSaved = () => null,
		onDeleted = () => null,
		onDeleteFailed,

		isLoading: propsIsLoading = false,

		actionLabeling = true,
		editIcon = "EditTwoTone",
		editLabel = actionLabeling ? `Edit ${title}` : `Edit`,
		deleteTitle = "",
		deleteMessage = "",
		disableActions = { add: false, edit: false, delete: false, saveButton: false },
		additionalButtons = [],
		isExternalActionBar,

		filterFunction,

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		idSelector = (p?: T) => p?.id ?? p?._id ?? "",

		forceInit = 1,

		readOnly = false,

		reloadAfterUpdate = false,
		reloadAfterCloseUpdate = false,

		editOnDbClick = false,

		forceRefreshSelection: propsForceRefreshSelection = 0,
	} = props;
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	// 	local state - fetch and set
	const [data, setData] = useState<Array<T>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedRows, setSelectedRows] = useState<Array<T>>([]);
	const [originFormData, setOriginFormData] = useState<T>();
	const [formData, setFormData] = useState<T>();
	const [isOpen, setIsOpen] = useState(false);
	const [filter, setFilter] = useState({ search_word: "" });
	const [forceRefreshSelection, setForceRefreshSelection] = useState(1);

	const openLoading = useMemo(() => isLoading || propsIsLoading, [isLoading, propsIsLoading]);

	const formattedData = useMemo(() => {
		const merged = [...(preData ?? []), ...(data ?? [])];

		const filtered = isEmpty(Object.values(filter))
			? merged
			: merged.filter((item) =>
					Object.values(item ?? {})
						.join(" ")
						.toLowerCase()
						.includes(filter?.search_word?.toLowerCase()),
			  );
		if (filterFunction) {
			return filterFunction(filtered);
		}

		return filtered;
	}, [data, JSON.stringify(filter), filterFunction, preData]);

	const isSelected = useMemo<boolean>(() => selectedRows.length > 0, [selectedRows.length]);

	const notChanged = useMemo<boolean>(
		() => JSON.stringify(originFormData) === JSON.stringify(formData),
		[JSON.stringify(originFormData), JSON.stringify(formData)],
	);

	const loadData = useCallback(async () => {
		setIsLoading(true);
		const response = await apiService.gets(queryData);
		if (response.code === APIResponseCode.SUCCESS) {
			setData(response?.data ?? []);

			if (onLoad) {
				onLoad(response.data ?? []);
			}
		} else {
			enqueueSnackbar(response.message, { variant: "warning" });
		}
		setIsLoading(false);
	}, [queryData]);

	const handleSearch = (value: string | React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement> | undefined) => {
		if (typeof value === "string") {
			setFilter((s) => ({ ...(s ?? {}), search_word: value }));
		}
	};

	const handleSelectRow = (value: T) => {
		setFormData(formatOnEdit({ ...(value ?? {}), ...(queryData ?? {}) }));
		setOriginFormData(value);
	};

	const handleSelectRows = (value: Array<T>) => {
		onSelect(value);
		setSelectedRows(value);
	};

	const handleClickRow = (e: RowClickedEvent<T>) => {
		if (e.data) {
			handleSelectRow(e.data);
		}
	};

	const handleDbClickRow = (e: RowDoubleClickedEvent<T>) => {
		navigate("sub-route");
		if (enableSubRoute) {
			if (idSelector(e.data)) {
				navigate(idSelector(e.data));
			}
		} else {
			onDbClickRow(e);
		}

		if (editOnDbClick) {
			setIsOpen(true);
			onOpenEdit(formatOnEdit((e?.data ?? {}) as T));
			handleSelectRow((e?.data ?? {}) as T);
		}
	};

	const handleChangeForm: DispatchFunction<T> = (value, name) => {
		setFormData(formatOnChange(value, name));
	};

	const handleAdd = () => {
		if (forceSubRouteMode) {
			navigate("new");
		} else {
			const NEW_ITEM = { ...(initFormData ?? {}) } as T;
			onOpenEdit(formatOnEdit(NEW_ITEM));
			handleSelectRow(NEW_ITEM);

			setIsOpen(true);
		}
	};

	const handleEdit = () => {
		if (forceSubRouteMode && idSelector(formData)) {
			navigate(idSelector(formData));
		} else {
			onOpenEdit(formatOnEdit((formData ?? {}) as T));
			if (!preventOpenEdit) {
				setIsOpen(true);
				setForceRefreshSelection((s = 1) => s + 1);
			}
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setForceRefreshSelection((s = 1) => s + 1);
		if (reloadAfterCloseUpdate && idSelector(formData)) {
			loadData();
		}
	};

	const handleSave =
		notChanged ||
		readOnly ||
		(typeof disableActions.saveButton === "function" ? disableActions.saveButton((formData ?? {}) as T) : disableActions.saveButton)
			? undefined
			: async () => {
					setIsLoading(true);
					const submitData = { ...formData, ...queryData };
					const response = await apiService.save({ data: submitData });
					if (response.code === APIResponseCode.SUCCESS) {
						const isUpdate = idSelector(submitData) && !(idSelector(submitData) === "new");
						const inserted = isUpdate ? submitData : { ...submitData, id: typeof response.data === "string" ? response.data : "" };

						if (reloadAfterUpdate) {
							loadData();
						} else {
							setData((s = []) =>
								idSelector(submitData) ? s.map((item) => (idSelector(item) === idSelector(inserted) ? inserted : item)) : [...s, inserted],
							);
							setIsLoading(false);
						}

						onSaved(inserted, isUpdate ? OnSaveNames.UPDATE : OnSaveNames.CREATE);

						setIsOpen(false);
					} else {
						enqueueSnackbar(response.message, { variant: "warning" });
						setIsLoading(false);
					}
			  };

	const handleDelete = async () => {
		setIsLoading(true);

		if (selectedRows.length) {
			if (selectedRows.length === 1 || rowSelection === "single") {
				const id: string = idSelector(selectedRows?.[0]) ?? "";
				const response = await apiService.deletes({ ids: [id] });
				if (response.code === APIResponseCode.SUCCESS) {
					if (reloadAfterUpdate) {
						loadData();
					} else {
						setData((s = []) => s.filter((item) => !(idSelector(item) === id)));
					}

					onDeleted(selectedRows?.[0], OnSaveNames.DELETE);

					setSelectedRows([]);
				} else {
					if (typeof onDeleteFailed === "function") {
						onDeleteFailed((selectedRows?.[0] ?? {}) as T);
					} else {
						enqueueSnackbar(response.message, { variant: "warning" });
					}
				}
			} else {
				const response = await apiService.deletes({ ids: selectedRows.map((item) => idSelector(item) ?? "").filter((item) => item) });
				if (response.code === APIResponseCode.SUCCESS) {
					if (reloadAfterUpdate) {
						loadData();
					} else {
						setData((s = []) => s.filter((item) => !selectedRows.some((t) => idSelector(t) === idSelector(item))));
					}

					setSelectedRows([]);
				} else {
					enqueueSnackbar(response.message, { variant: "warning" });
				}
			}
		}

		setIsLoading(false);
	};

	const actionBarDefaultButtons: Array<ActionBarButton> = useMemo(
		() =>
			[
				{
					id: `${ActionBarButtonId.ADD}_${title?.toString().toUpperCase()}`,
					icon: "AddTwoTone",
					title: actionLabeling ? `Add ${title}` : `Add`,
					action: handleAdd,
					hidden:
						(typeof disableActions.add === "function" ? disableActions.add((formData ?? {}) as T) : disableActions.add) ||
						readOnly ||
						selectedRows.length > 0,
					order: 1,
					color: "info",
				},
				{
					id: `${ActionBarButtonId.EDIT}_${title?.toString().toUpperCase()}`,
					icon: editIcon,
					title: editLabel,
					action: handleEdit,
					showWhenSelected: true,
					hidden:
						(typeof disableActions.edit === "function" ? disableActions.edit((formData ?? {}) as T) : disableActions.edit) ||
						readOnly ||
						selectedRows.length > 1,
					order: 2,
					color: "info",
				},
				{
					id: `${ActionBarButtonId.DELETE}_${title?.toString().toUpperCase()}`,
					icon: "Delete",
					title: deleteTitle || actionLabeling ? `Delete ${title}` : `Delete`,
					message:
						deleteMessage ||
						`Are you sure want to permanently delete the "${
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							selectedRows.length === 1 ? selectedRows?.[0]?.[columns?.[0]?.field] ?? "" : selectedRows.length
						}" ${title}?
		\nThis deletion will result in deleting all the Fields that user this ${title} and all the data that have been stored in the database for those Fields. Click "Confirm Deletion" to proceed or "Cancel" to go back`,
					action: handleDelete,
					showWhenSelected: true,
					isConfirm: true,
					color: "error",
					hidden:
						(typeof disableActions.delete === "function" ? disableActions.delete((formData ?? {}) as T) : disableActions.delete) ||
						readOnly,
					order: 3,
				},
			] as Array<ActionBarButton>,
		[disableActions, columns, readOnly, selectedRows.length],
	);

	const actionBarButtons: Array<ActionBarButton> = useMemo(
		() =>
			[...actionBarDefaultButtons, ...additionalButtons].filter(
				(item) => !item?.hidden && (item?.showWhenSelected ? isSelected : true) && (item?.hideWhenSelected ? !isSelected : true),
			),
		[actionBarDefaultButtons, additionalButtons, isSelected, selectedRows.length],
	);

	// useEffect(() => {
	// 	setActionBarButtons(actionBarButtons);
	// }, [actionBarButtons]);

	// show action by using provider
	// useEffect(() => {
	// 	if (isExternalActionBar) {
	// 		setActionBarButtons(actionBarButtons);
	// 	}
	// }, [JSON.stringify(actionBarButtons)]);

	useEffect(() => {
		if (propsForceRefreshSelection) {
			setForceRefreshSelection((s = 1) => s + 1);
		}
	}, [propsForceRefreshSelection]);

	useEffect(() => {
		if (isInitLoad) {
			loadData();
		}
	}, [forceInit, isInitLoad]);

	return {
		openLoading,
		isOpen,
		setIsOpen,
		loadData,
		handleSave,
		formData,
		handleChangeForm,
		isExternalActionBar,
		actionBarButtons,
		formattedData,
		selectedRows,
		forceRefreshSelection,
		handleClickRow,
		handleDbClickRow,
		handleSelectRow,
		handleSelectRows,
		handleSearch,
		handleClose,
	};
}

export default useEditTableManage;
