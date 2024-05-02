import {
	Gender,
	AgeRelationType,
	Mbti,
	Religion,
	SmokingYn,
	ApiCaller,
	UpdateMemberRequestDto,
	Formatter,
} from "../../shared/shared";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { getMissingValueColumns } from "./util/columns";
import { useFormData } from "./hooks/useForm";
import {
	FormAddress,
	FormFile,
	FormInput,
	FormNumber,
	FormSelect,
	FormTextarea,
} from "./MemberEditComponent";
import style from "./MemberEdit.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../app/config";

export function MemberEdit() {
	const { memberId } = useParams();
	const [imageUrl, setImageUrl] = useState<string>("");
	const navigate = useNavigate();
	// 개인정보 수집 이용 동의서
	const [formData, setters, getters] = useFormData(
		new UpdateMemberRequestDto()
	);
	useEffect(() => {
		if (memberId) {
			ApiCaller.get(`/members/${memberId}`)
				.then(async (res) => {
					const { profileImageId } = res.data;
					if (profileImageId) {
						setImageUrl(
							`${config.api_url}/images/${profileImageId}`
						);
					}
					setters.setFormData(new UpdateMemberRequestDto(res.data));
					return res;
				})
				.catch((e) => {
					alert("해당 유저ID의 정보가 없습니다" + e);
					navigate("/SignupManage");
				});
		}
	}, []);

	const handleEdit = (e: any) => {
		//수정 api 개발시 수정필요
		e.preventDefault();
		const missing = getMissingValueColumns(formData);
		if (missing.length > 0) {
			alert(`${missing.join(", ")}은 필수 입력 항목입니다.`);
			return;
		}
		ApiCaller.formDataPatch(
			`/members/${memberId}`,
			UpdateMemberRequestDto.toFormData(formData)
		)
			.then(() => {
				alert("회원 수정 완료");
				navigate(`/MemberManage`);
			})
			.catch((e) => {
				alert(e);
			});
		return;
	};

	const handleDelete = (e: any) => {
		e.preventDefault();
		const missing = getMissingValueColumns(formData);
		if (missing.length > 0) {
			alert(`${missing.join(", ")}은 필수 입력 항목입니다.`);
			return;
		}
		ApiCaller.delete(`/members/${memberId}`, formData)
			.then(() => {
				alert("회원 삭제 완료");
				navigate(`/MemberManage`);
			})
			.catch((e) => {
				alert(e);
			});
		return;
	};
	return (
		<div>
			{/* 유저 입력폼 */}
			<form className={classNames("container mt-5")}>
				<h5>내 정보</h5>
				<FormInput
					column="kakaoId"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>
				<h6>주소</h6>
				<FormAddress
					column="sido"
					getValue={getters.getAddressValue}
					onChange={setters.handleAddressChange}
				/>
				<FormAddress
					column="sigungu"
					getValue={getters.getAddressValue}
					onChange={setters.handleAddressChange}
				/>
				<FormAddress
					column="eupmyundong"
					getValue={getters.getAddressValue}
					onChange={setters.handleAddressChange}
				/>
				<h6>내 정보</h6>
				<FormInput
					column="name"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>
				<FormSelect
					column="gender"
					seleted={formData.gender || ""}
					options={[["", "선택해주세요"], ...Object.entries(Gender)]}
					onChange={setters.handleChange}
				/>
				<FormInput
					column="birthday"
					type="date"
					getValue={getters.getDateValue}
					onChange={setters.handleDateChange}
				/>
				<FormNumber
					column="height"
					getValue={getters.getValue}
					onChange={setters.handleHeightChange}
				/>
				<FormInput
					column="phoneNumber"
					getValue={getters.getValue}
					onChange={setters.handlePhoneNumberChange}
				/>
				<FormInput
					column="company"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>
				<FormInput
					column="job"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>
				<FormInput
					column="university"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>

				<FormSelect
					column="mbti"
					seleted={formData.mbti || ""}
					options={[["", "선택해주세요"], ...Object.entries(Mbti)]}
					onChange={setters.handleChange}
				/>
				<FormSelect
					column="smokingYn"
					seleted={formData.smokingYn || ""}
					options={[
						["", "선택해주세요"],
						...Object.entries(SmokingYn),
					]}
					onChange={setters.handleChange}
				/>
				<FormSelect
					column="religion"
					seleted={formData.religion || ""}
					options={[
						["", "선택해주세요"],
						...Object.entries(Religion),
					]}
					onChange={setters.handleChange}
				/>
				<FormTextarea
					column="charmingPoint"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>
				<FormTextarea
					column="note"
					getValue={getters.getValue}
					onChange={setters.handleChange}
				/>
				{imageUrl !== "" ? (
					<img
						src={imageUrl}
						alt="profileCardImage"
						style={{
							width: `${config.profile_image_size}px`,
						}}
					/>
				) : null}
				<FormFile
					column="profileCardImage"
					setImageUrl={setImageUrl}
					setFormData={setters.setFormData}
				/>
				<h5>절대 안되는 상대 정보</h5>
				<FormSelect
					column="filteringAgeRelation"
					seleted={formData.filteringAgeRelation || ""}
					options={[
						["", "상관없음"],
						...Object.entries(AgeRelationType),
					]}
					onChange={setters.handleChange}
				/>
				<FormSelect
					column="filteringSmoker"
					seleted={formData.filteringSmoker || ""}
					options={[
						["", "선택해주세요"],
						["N", "상관없음"],
						["Y", "비흡연"],
					]}
					onChange={setters.handleChange}
				/>
				<FormSelect
					column="filteringReligion"
					seleted={formData.filteringReligion || ""}
					options={[["", "상관없음"], ...Object.entries(Religion)]}
					onChange={setters.handleChange}
				/>
				<div className={style.buttonContainer}>
					<button
						type="submit"
						className={`btn btn-primary ${style.btn_item}`}
						onClick={handleEdit}
					>
						수정
					</button>
					<button
						type="submit"
						className={`btn btn-primary ${style.btn_item}`}
						onClick={handleDelete}
					>
						삭제
					</button>
				</div>
			</form>
		</div>
	);
}