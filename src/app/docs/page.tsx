import Link from "next/link"
import Form from "./doc_add"
import List from "./doc_list"


export default function Users() {
  return (
    <article className="single-page">
      <h1> Create Doctor</h1>
      <Form />
      <Link href="/" className="btn btn-link">go to Home</Link>
      <List />
    </article>
  );
}
