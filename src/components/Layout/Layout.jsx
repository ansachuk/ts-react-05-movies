import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Fallback from "components/Fallback/Fallback";
import css from "./Layout.module.scss";

export default function Layout() {
	return (
		<>
			<header className={css.header}>
				<nav className={css.nav}>
					<ul className={css.list}>
						<li className={css.item}>
							<NavLink className={css.navLink} to={"/"}>
								Home
							</NavLink>
						</li>
						<li className={css.item}>
							<NavLink className={css.navLink} to={"/movies"}>
								Movies
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<main className={css.main}>
				<div className={css.container}>
					<Suspense fallback={<Fallback />}>
						<Outlet />
					</Suspense>
				</div>
			</main>
		</>
	);
}
