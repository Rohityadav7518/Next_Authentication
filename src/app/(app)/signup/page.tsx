"use client"

import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Page() {
const [user, setUser] = React.useState({
username: "",
email: "",
password: "",
});
const router = useRouter();

const onSignup = async () => {
try {
const response = await axios.post("/api/users/signup", user);
console.log(response);
router.push('/login');
} catch (error) {
console.log("Signup Failed", error);
}
};

return (
<>
<div className="flex items-center justify-center min-h-screen p-2 flex-col">
<h1>Signup</h1>
<hr />
<label htmlFor="username">username</label>
<input type="text" id='username' value={user.username}
onChange={(e) => setUser({ ...user, username: e.target.value })} />
<label htmlFor="email">email</label>
<input type="text" id='email' value={user.email}
onChange={(e) => setUser({ ...user, email: e.target.value })} />
<label htmlFor="password">password</label>
<input type="text" id='password' value={user.password}
onChange={(e) => setUser({ ...user, password: e.target.value })} />
<button onClick={onSignup} className='bg-blue-400 border border-gray-400 p-2 font-bold'>signup</button>
<p><Link href={'/login'}>login Here</Link></p>
</div>
</>
);
}

export default Page;