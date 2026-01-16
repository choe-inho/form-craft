'use client'
import { Button } from '@/components/ui/button'
import styles from './SideNavigation.module.scss'
import { FolderIcon, HomeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation' 

function SideNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // localStorage에서 로그인 상태 확인
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  
  return (
    <div className={styles.container}>
        {/*사이드 네비게이션 바*/}
      <div className={styles.container__home}>
       <Button 
                 variant="ghost"
                 size="icon-lg"
                 className={pathname === '/' ? 'text-primary' : 'text-gray-600' }
              >
         <HomeIcon 
            className={`size-6 ${pathname === '/' ? 'text-primary' : 'text-gray-400'}`}
          />
       </Button> 
      </div>
      <div className={styles.container__projects}>
           <Button 
                 variant="ghost"
                 size="icon-lg" 
                 className={pathname === '/projects' ? 'text-primary' : 'text-gray-600'}
              > 
         <FolderIcon 
            className={`size-6 ${pathname === '/projects' ? 'text-primary' : 'text-gray-400'}`}
          />
        </Button> 
      </div>  
      <div className={styles.container__user}>
            {isLoggedIn && (
          <img 
            src="https://placehold.co/600x400" // 임시 이미지 경로
            alt="Profile"
            className={styles.container__user__profile}
          />
        )}
      </div>
    </div>
  )
} 

export default SideNavigation 