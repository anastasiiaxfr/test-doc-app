import Link from "next/link"
import Form from "./offer_add"
import List from "./offer_list"

export default function Users() {
  return (
    <>
      <h1>Get My Doctor</h1>
      <Form />
      <Link href="/" className="btn btn-link">go to Home</Link>
      <List />
    </>
  )
}
