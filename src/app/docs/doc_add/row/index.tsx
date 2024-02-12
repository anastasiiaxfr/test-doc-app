import Input from '../input'

export default function TableRow({ day, month, year, formik }: any) {
    return (
        <tr>
            <th>{day}.{month}.{year}</th>
            <td><Input formik={formik} value={`${day}.${month}.${year}-10:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-11:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-12:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-14:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-15:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-16:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-17:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-18:00`} /></td>
            <td><Input formik={formik} value={`${day}.${month}.${year}-19:00`} /></td>
        </tr>
    )
}