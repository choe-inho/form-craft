'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileText, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Form {
  id: number;
  title: string;
  responses: number;
  createdAt: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: '전체' },
    { id: 'survey', name: '내 설문' },
    { id: 'company', name: '회사 프로젝트' },
  ]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: newCategoryName.trim()
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === 'all') return;
    setCategories(categories.filter(cat => cat.id !== categoryId));
    if (selectedCategory === categoryId) {
      setSelectedCategory('all');
    }
  };

  const handleCreateForm = () => {
    router.push('/form/create');  // 폼 생성 페이지로 이동
  };

  if (isLoading || !isLoggedIn) return null;

  const forms: Form[] = [];

  const filteredForms = selectedCategory === 'all' 
    ? forms 
    : forms.filter(form => form.category === selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <div>
          <h1 className={styles.container__header__title}>My Forms</h1>
          <p className={styles.container__header__subtitle}>
            오늘은 어떤 폼을 만들까요?
          </p>
        </div>
        <Button size="lg" onClick={handleCreateForm}>  {/* onClick 추가 */}
          <PlusCircle className="w-5 h-5" />
          New Form
        </Button>
      </div>

      {/* 카테고리 탭 */}
      <div className={styles.container__categories}>
        {categories.map(category => (
          <div 
            key={category.id}
            className={`${styles.category} ${selectedCategory === category.id ? styles.category__active : ''}`}
          >
            <button
              onClick={() => setSelectedCategory(category.id)}
              className={styles.category__button}
            >
              {category.name}
            </button>
            {category.id !== 'all' && (
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className={styles.category__delete}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {/* 카테고리 추가 */}
        {isAddingCategory ? (
          <div className={styles.category__add}>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder="카테고리 이름"
              className="h-8 w-32"
              autoFocus
            />
            <Button size="sm" onClick={handleAddCategory}>확인</Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => {
                setIsAddingCategory(false);
                setNewCategoryName('');
              }}
            >
              취소
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingCategory(true)}
            className={styles.category__addButton}
          >
            <Plus className="w-4 h-4" />
            카테고리 추가
          </button>
        )}
      </div>

      {filteredForms.length === 0 ? (
        <div className={styles.container__empty}>
          <FileText className="w-20 h-20 text-gray-300" />
          <h2 className={styles.container__empty__title}>
            {selectedCategory === 'all' 
              ? '아직 만든 폼이 없어요' 
              : '이 카테고리에 폼이 없어요'}
          </h2>
          <p className={styles.container__empty__description}>
            첫 번째 폼을 만들어서 시작해보세요!
          </p>
          <Button size="lg" className="mt-4" onClick={handleCreateForm}>  {/* onClick 추가 */}
            <PlusCircle className="w-5 h-5" />
            첫 폼 만들기
          </Button>
        </div>
      ) : (
        <div className={styles.container__grid}>
          {filteredForms.map(form => (
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