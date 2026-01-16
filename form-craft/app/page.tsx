'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileText } from 'lucide-react';

// 타입 정의 추가
interface Form {
  id: number;
  title: string;
  responses: number;
  createdAt: string;
}

function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading || !isLoggedIn) return null;

  // 타입 명시
  const forms: Form[] = [];
  // const forms: Form[] = [
  //   { id: 1, title: 'Customer Feedback', responses: 12, createdAt: '2 days ago' },
  //   { id: 2, title: 'Event Registration', responses: 45, createdAt: '5 days ago' },
  //   { id: 3, title: 'Survey 2024', responses: 8, createdAt: '1 week ago' },
  // ];

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <div>
          <h1 className={styles.container__header__title}>My Forms</h1>
          <p className={styles.container__header__subtitle}>
            오늘은 어떤 폼을 만들까요?
          </p>
        </div>
        <Button size="lg">
          <PlusCircle className="w-5 h-5" />
          New Form
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className={styles.container__empty}>
          <FileText className="w-20 h-20 text-gray-300" />
          <h2 className={styles.container__empty__title}>
            아직 만든 폼이 없어요
          </h2>
          <p className={styles.container__empty__description}>
            첫 번째 폼을 만들어서 시작해보세요!
          </p>
          <Button size="lg" className="mt-4">
            <PlusCircle className="w-5 h-5" />
            첫 폼 만들기
          </Button>
        </div>
      ) : (
        <div className={styles.container__grid}>
          {forms.map(form => (
            <Card key={form.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>{form.createdAt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{form.responses}</span>
                  <span>responses</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home