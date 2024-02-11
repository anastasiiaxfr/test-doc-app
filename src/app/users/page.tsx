import Link from "next/link"
import Form from "./user_add"
import List from "./user_list"


export default function Users() {
  return (
    <center className="p-24">
      <h1>Create User</h1>
      <Form />
      <Link href="/" className="btn btn-link">go to Home</Link>
      <List />
    </center>
  )
}
