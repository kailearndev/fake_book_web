import { Link } from "@tanstack/react-router";
import { Bug, Home, Settings, TrendingUp } from "lucide-react";

const menu = [
	{
		label: "Trang chủ",
		to: "/",
		icon: <Home />,
	},
	{
		label: "Trending",
		to: "/trending",
		icon: <TrendingUp />,
	},
	{
		label: "Cài đặt",
		to: "/settings",
		icon: <Settings />,
	},
];
export default function Header() {
	const handleLogout = () => {
		localStorage.removeItem("access_token");
		window.location.href = "/login";
	}
	return (
		<nav className="lg:flex flex-col gap-4 justify-between w-70  shrink-0 p-4 hidden">
			<div className="space-y-10">
				<div className="relative mt-4 flex items-center gap-4 justify-center">
					<Bug className="absolute right-2 rotate-14  -top-3 z-4 " />
					<div className="flex flex-col gap-2 ">
						<Link to="/">
							<h1 className="text-4xl font-bold font-display  tracking-wider z-0">
								{"{Fake_Book}"}
							</h1>
							<span className="text-[10px] font-bold font-mono tracking-wide uppercase text-muted-foreground z-0">
								Your fake book for testing and development.
							</span>
						</Link>
					</div>
				</div>
				<div className="font-mono flex flex-col gap-4 h-full">
					{menu.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="group h-12 flex items-center gap-2 rounded-md p-2 text-sm font-bold hover:text-white transition-all duration-300 hover:shadow-hard shadow-neutral hover:bg-secondary "
						>
							{/* Icon: Khi hover vào Link, icon sẽ xoay hoặc đổi màu */}
							<span className="text-muted-foreground ">{item.icon}</span>

							{/* Label: Khi hover vào Link, chữ sẽ đậm lên hoặc đổi màu */}
							<span>{item.label}</span>
						</Link>
					))}
				</div>
			</div>

			<div className="flex flex-col">
				<button onClick={handleLogout} className="bg-primary-container mb-2! text-white px-4 py-2 rounded-md  hover:bg-primary-container/90 transition-all">
					Đăng xuất
				</button>
				<div className="text-sm text-muted-foreground">
					&copy; 2024 Fake_Book. All rights reserved.
				</div>
			</div>
		</nav>
	);
}
