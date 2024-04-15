import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ConditionListModel } from "../../../shared";
import { useRef, useState } from "react";

interface DateConditionProps {
	title: string;
	targetColumn: keyof ConditionListModel;
	conditionData: ConditionListModel;
	setConditionData: Function;
}
export function DateCondition({
	title,
	targetColumn,
	conditionData,
	setConditionData,
}: DateConditionProps) {
	const datePickerRef = useRef<DatePicker>(null);
	const [isActive, setActive] = useState(false);

	//달력 활성화
	// useEffect(() => {
	// 	datePickerRef.current?.setFocus();
	// });

	return (
		<div className="dropdown">
			<button
				className={`btn ${isActive == false ? 'btn-light' : 'btn-dark'} btn-lg dropdown-toggle`}
				data-bs-toggle="dropdown"
				aria-expanded="false"
				data-bs-auto-close="true"
			>
				{title}
			</button>
			<ul className="dropdown-menu">
				<li>
					<DatePicker className="dropdown-item"
						ref={datePickerRef}
						id="datePicker"
						selected={conditionData[targetColumn] as Date}
						onChange={(date: Date) => {
							setConditionData({
								...conditionData,
								[targetColumn]: date,
							});
							setActive(true);
						}}
						dateFormat="yyyy-MM-dd"
					/>
				</li>
				<li>
					<a	className="btn btn-dark"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setConditionData({
								...conditionData,
								[targetColumn]: null,
							});
							setActive(false);
						}}
					>
						clear
					</a>
				</li>
			</ul>
		</div>
	);
}

export default DateCondition;
