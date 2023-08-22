import { FC, PropsWithChildren, useEffect, useRef } from "react";

const OutsideClickDetector: FC<PropsWithChildren<{ onClickOutside?: () => void }>> = ({ children = null, onClickOutside = () => null }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// add event listener to detect clicks outside the component
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		// cleanup function to remove the event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, onClickOutside]);

	return <div ref={ref}>{children}</div>;
};

export default OutsideClickDetector;
