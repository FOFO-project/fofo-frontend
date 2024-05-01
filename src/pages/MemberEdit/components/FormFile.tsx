import { labelColumnsMap } from "../util/columns";
import { UpdateMemberRequestDto } from "../../../shared/shared";
import { useState } from "react";

interface FormFileProps {
	column: keyof UpdateMemberRequestDto;
	setFormData: Function;
}
export function FormFile({ column, setFormData }: FormFileProps) {
	const [file, setFile] = useState<File>();

	function updateForm(value: any) {
		setFormData(() => ({
			[column]: value,
		}));
	}

	const onChange = () => {
		(e: any) => {
			const updatefile = e.target.file;
			// const updatefile = (await Formatter.resizeImage(
			// 	e.target.files[0],
			// 	config.resize_image_size
			// ).catch(() => null)) as File;

			if (updatefile) {
				let newFile = updatefile ? updatefile : file;
				setFile(newFile);
				updateForm(newFile);
			} else {
				setFile(undefined);
				updateForm(null);
			}
		};
	};
	return (
		<div className="mb-3">
			<label className="form-label">{labelColumnsMap[column]}</label>
			<h6>프로필카드</h6>
			<input
				type="file"
				className="form-control"
				accept="image/*"
				onChange={onChange}
			/>
		</div>
	);
}
