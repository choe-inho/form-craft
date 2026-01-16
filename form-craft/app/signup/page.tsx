'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 임시 회원가입 처리
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__signupBox}>
        <h1 className={styles.container__signupBox__title}>회원가입</h1>
         
        <div className={styles.container__signupBox__form}>
          <div className="w-full space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="w-full space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input 
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input  
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSignup}
          >
            시작하기 
          </Button>
          
          <div className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <span 
              className="text-primary cursor-pointer hover:underline font-medium"
              onClick={() => router.push('/login')}
            >
              로그인
             </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup