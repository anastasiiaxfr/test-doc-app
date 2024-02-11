import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main className="">
      <article className="p-24">
        <h1>All data info:</h1>
        <ol className="menu-nav">
          <li><Link href="/users" underline="none">Add User <Button variant="outlined" size="small">Create</Button></Link></li>
          <li><Link href="/docs" underline="none">Add Doctor <Button variant="outlined" size="small">Create</Button></Link></li>
          <li><Link href="/get-doc" underline="none">Get My Doctor <Button variant="outlined" size="small">Visit</Button></Link></li>
        </ol>
      </article>
    </main>
  );
}
