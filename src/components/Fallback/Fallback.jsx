import { LineWobble } from "@uiball/loaders";

import css from "./Fallback.module.scss";

export default function Fallback() {
	return (
		<div className={css.wrapper}>
			<LineWobble size={80} lineWeight={5} speed={1.75} color="black" />
		</div>
	);
}
