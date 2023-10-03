declare module "*.svg" {
	const content: never;
	export default content;
}

declare module "*.png" {
	const content: never;
	export default content;
}

declare module "*.scss" {
	const content: { [className: string]: string };
	export default content;
}
