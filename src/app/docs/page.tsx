import Form from "./doc_add"
import List from "./doc_list"

export default function Users() {
  return (
    <article className="single-page">
      <h1> Create Doctor</h1>
      <Form />
      <List />
    </article>
  );
}
