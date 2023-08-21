import { FC, PropsWithChildren, useEffect, useRef } from "react";

// =================================|| SCROLL CONTAINER ||==================================== //

const ScrollContainer: FC<PropsWithChildren> = ({ children = null }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.maxHeight = `${containerRef.current.offsetHeight - 10}px`;
		}
	}, [containerRef.current]);

	return (
		<div ref={containerRef} style={{ flex: 1, height: "100%", overflowY: "auto" }}>
			{children}
		</div>
	);
};

export default ScrollContainer;
