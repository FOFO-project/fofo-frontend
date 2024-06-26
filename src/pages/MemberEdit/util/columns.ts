import { AddressFormDTO, UpdateMemberRequestDto } from "../../../shared/shared";

export const labelColumnsMap: any = {
	kakaoId: "카카오톡 ID(Kakao ID)",
	sido: "시도",
	sigungu: "시군구",
	eupmyundong: "읍면동",
	name: "이름(Name)",
	gender: "성별(Gender)",
	birthday: "생년월일(Birthday)",
	height: "키(Height)",
	phoneNumber: "전화번호(Phone Number)",
	company: "회사명(Company)",
	job: "직무(Job)",
	university: "출신학교(University)",
	mbti: "MBTI",
	smokingYn: "흡연여부(Smoking)",
	religion: "종교(Religion)",
	charmingPoint: "어필 사항(Charming Point)",
	filteringAgeRelation: "절대 안되는 나이조건(연상/동갑/연하)(Age Relation)",
	filteringSmoker: "상대방 흡연여부(Smoking)",
	filteringReligion: "절대 안되는 종교(Religion)",
	note: "관리자 멘트(Note)",
	profileCardImage: "프로필 카드(profileCardImage)",
};

export const except: string[] = [
	"eupmyundong",
	"phoneNumber",
	"height",
	"filteringAgeRelation",
	"filteringReligion",
	"charmingPoint",
	"note",
	"profileCardImage",
	"zipcode",
];

export function getMissingValueColumns(data: UpdateMemberRequestDto) {
	const missing = [];
	for (const key of Object.keys(data)) {
		if (key === "address") {
			for (const item of Object.keys(data[key])) {
				if (except.includes(item as keyof AddressFormDTO)) {
					continue;
				}
				if (data[key][item as keyof AddressFormDTO] === null) {
					missing.push(labelColumnsMap[item]);
				}
			}
		}
		if (except.includes(key as keyof UpdateMemberRequestDto)) {
			continue;
		}
		if (data[key as keyof UpdateMemberRequestDto] === null) {
			missing.push(labelColumnsMap[key]);
		}
	}

	return missing;
}
