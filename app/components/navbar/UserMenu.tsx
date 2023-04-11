"use client";

import { BiMenu } from "react-icons/bi";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
	currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const userMenuToggle = useCallback(() => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	}, []);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={() => {}}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
				>
					Booking Home
				</div>
				<div
					onClick={userMenuToggle}
					className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<BiMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div className="absolute rounded-xl shadow-md min-w-fit bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem onClick={() => {}} label="My Trips" />
								<MenuItem onClick={() => {}} label="My Favorites" />
								<MenuItem onClick={() => {}} label="My Reservations" />
								<MenuItem onClick={() => {}} label="My Properties" />
								<MenuItem onClick={() => {}} label="Booking Home" />
								<hr />
								<MenuItem onClick={() => signOut()} label="Logout" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label="Log In" />
								<MenuItem onClick={registerModal.onOpen} label="Sign Up" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
