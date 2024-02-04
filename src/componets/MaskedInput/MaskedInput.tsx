import { forwardRef, ChangeEvent } from "react";
import { IMaskInput, IMaskInputProps } from "react-imask";

const MaskedInput = forwardRef<
	HTMLInputElement,
	IMaskInputProps<HTMLInputElement>
>(function MaskedInput(props, ref) {
	const { onChange } = props;

	return (
		<IMaskInput
			{...props}
			inputRef={ref}
			overwrite
			onAccept={(value: string) => {
				if (onChange) {
					const event = {
						target: {
							name: props.name,
							value,
						},
					};
					onChange(event as ChangeEvent<HTMLInputElement>);
				}
			}}
		/>
	);
});

export default MaskedInput;
