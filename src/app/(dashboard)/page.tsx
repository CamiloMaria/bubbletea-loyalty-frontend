import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = await cookies();
    const userRole = cookieStore.get('user_role')?.value;

    if (userRole === 'ADMIN') {
        redirect('/dashboard');
    } else {
        redirect('/customers');
    }
}