import { useFormikContext } from 'formik';

export default function Input({ value, formik }: any) {
    const formikVal = useFormikContext();
    return (
        <input
            type="checkbox"
            name="slots"
            value={value}
            onChange={(e) => {
                const isChecked = e.target.checked;
                const slot = e.target.value;

                if (isChecked && formik) {
                    formik.setFieldValue('slots', [...formik.values.slots, slot]);
                } else if (formik) {
                    formik.setFieldValue('slots', formik.values.slots.filter((s: any) => s !== slot));
                }
            }}
        />
    );
}
