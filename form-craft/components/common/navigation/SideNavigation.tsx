import { Button } from '@/components/ui/button'
import styles from './SideNavigation.module.scss'
import { FolderIcon, HomeIcon } from 'lucide-react'

function SideNavigation() {
  return (
    <div className={styles.container}>
        {/*사이드 네비게이션 바*/}
      <div className={styles.container__home}>
           <Button>
            <HomeIcon className='w-5 h-5'>
            </HomeIcon>  
        </Button>
      </div>
      <div className={styles.container__projects}>
              <Button>
                <FolderIcon>
 
                </FolderIcon>
              </Button>
      </div>
      <div className={styles.container__user}>

      </div>
    </div>
  )
} 

export default SideNavigation 