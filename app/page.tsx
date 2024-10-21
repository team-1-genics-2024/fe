import Link from 'next/link';

export default function Home() {
  return (
    <main className='text-center justify-center leading-10'>
      <h1 className='font-bold'>This is Homepage</h1>
      <Link href='/signup' className='mr-4 text-red-600'>sign up here</Link>
      <Link href='/login' className='text-red-600'>login here</Link>
    </main>
  );
}
