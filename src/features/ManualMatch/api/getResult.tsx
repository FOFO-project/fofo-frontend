import { ApiCaller } from "../../../shared/shared";

export const getResult = async (manId: number, womanId: number) => {
	return ApiCaller.post("/match/manual", {
		manMemberId: manId,
		womanMemberId: womanId,
	}).then((e) => {
		return e.data.result;
	});
};
