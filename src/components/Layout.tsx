import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {

	return (
		<div className="min-h-screen flex gap-10 w-full">
			<Header />
			<main className="flex-1 py-10 h-svh overflow-y-auto scroll-smooth ">
				{children}
			</main>
		</div>
	);
}
