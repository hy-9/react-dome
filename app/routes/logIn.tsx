import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function LogIn() {
	const [loginInfo, setLoginInfo] = useState(
		{
			username: '',
			password: ''
		}
	);
	function handleLogin() {
		alert('login')
	};
	function handleRegister() {
		alert('register')
	};
	return <>
		<CardContent
			className=' '
			style={{
				display: 'flex',
				flexDirection: 'column',
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)'
			}}>
			<Card style={{ padding: '20px', maxWidth: '600px' }}>
				<div className='flex flex-col'>
					<TextField id="standard-basic" label="用户名" variant="standard"
						slotProps={{ htmlInput: { 'value': loginInfo.username } }}
						onChange={(e) => { setLoginInfo({ username: e.target.value, password: loginInfo.password }) }}
					/>
					<TextField id="standard-basic" label="密码" variant="standard"
						onChange={(e) => { setLoginInfo({ username: loginInfo.username, password: e.target.value }) }}
						slotProps={{ htmlInput: { 'value': loginInfo.password } }}
					/>
				</div>
				<div className='mt-4 flex justify-between'>
					<Button variant="contained" className=' w-[45%]'
						onClick={ handleLogin }
					>登陆</Button>
					<Button variant="contained" className=' w-[45%]'
					onClick={ handleRegister }
					>注册</Button>
				</div>
			</Card>
		</CardContent>
	</>
}
