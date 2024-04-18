import React from "react";
import ReactDOM from "react-dom/client";
import { SignupManage, MemberManage, MemberForm, MatchingManage } from "../pages/pages";
import "./index.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";

export function init() {
	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<React.StrictMode>
			<RouterProvider
				router={createBrowserRouter([
					{
						path: "/",
						element: <Navigate to="/MemberForm" />,
					},
					{
						path: "/MemberForm",
						element: <MemberForm />,
					},
					{
						path: "/SignupManage",
						element: <SignupManage />,
					},
					{
						path: "/MemberManage",
						element: <MemberManage />,
					},
					{
						path: "/MatchingManage",
						element: <MemberManage />,
					},
				])}
			/>
		</React.StrictMode>
	);
}
