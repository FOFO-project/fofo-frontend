import React, { useEffect, useState } from "react";
import styles from "../ConditionBox.module.scss";
import {
	AgeRelationType,
	ConditionListModel,
	Filtering,
	Religion,
	Toggle,
} from "../../../shared";
import Select from "react-select";

interface FilteringConditionProps {
	title: string;
	conditionData: ConditionListModel;
	setConditionData: Function;
}
export function FilteringConditionCopy({
	title,
	conditionData,
	setConditionData,
}: FilteringConditionProps) {
	const [isActive, setActive] = useState(false);

	const ageRelationOptions = [
		["상관없음", null],
		...Object.entries(AgeRelationType),
	].map(([name, value]) => {
		return { value: value, label: name };
	});
	const smokingOption = [
		{ value: null, label: "상관없음" },
		{ value: true, label: "YES" },
		{ value: false, label: "NO" },
	];

	const religionOption = [
		["상관없음", null],
		...Object.entries(Religion),
	].map(([name, value]) => {
		return { value: value, label: name };
	});

	function onSelect(newValue: any, targetFilter: keyof Filtering) {
		const filteringCondition = conditionData.filtering_condition;
		setConditionData({
			...conditionData,
			filtering_condition: Object.assign(filteringCondition, {
				[targetFilter]: newValue?.value,
			}),
		});
	}
	return (
		<div className="col dropdown">
			<button
				className="btn btn-outline-dark btn-sm dropdown-toggle"
				data-bs-toggle="dropdown" 
				onClick={() => setActive(true)}
			>
				{title}
			</button>
			<ul className="dropdown-menu">
				<li className="dropdown-item">
					<h3>
						{`나이조건: ${conditionData.filtering_condition.AgeRelation}`}
					</h3>
					<Select options={ageRelationOptions}
						onChange={(newValue) => {
							onSelect(newValue, "AgeRelation");
						}}
					/>
				</li>
				<li className="dropdown-item">
					<h3>
						{`흡연조건: ${conditionData.filtering_condition.SmokingYn}`}
					</h3>
					<Select
						options={smokingOption}
						onChange={(newValue) => {
							onSelect(newValue, "SmokingYn");
						}}
					/>
				</li>
				<li className="dropdown-item">
					<h3>
						{`종교조건: ${conditionData.filtering_condition.Religion}`}
					</h3>
					<Select
						options={religionOption}
						onChange={(newValue: any) => {
							onSelect(newValue, "Religion");
						}}
					/>
				</li>
				<li className="dropdown-item">
					<button
						onClick={() => {
							setConditionData({
								...conditionData,
								filtering_condition: new Filtering(),
							});
							setActive(false);
						}}
					>
						clear
					</button>
				</li>
			</ul>
		</div>
	);
}