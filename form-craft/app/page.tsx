import { Button } from '@/components/ui/button';
import styles from './page.module.scss';

function Home() {
  return (
    <div className= {styles.container}>
      <div className={styles.container__onBoarding}>
        <span className= {styles.container__onBoarding__title}>
          오늘은 어떤 폼을 만들까요?
        </span>
          <div className={styles.container__onBoarding__option}>
            1. 카테고리 별로 다양한 폼을 생성해보세요<br></br>
            2. 간단한 클릭만으로 손쉰게 폼을 작성할 수 있어요<br></br>
            3. 작성된 폼은 링크로 공유할 수 있어요
          </div>
          {/* 폼 추가 버튼 */}
          <Button variant={'outline'}>Add New Form</Button>
      </div>
    </div>
  )
}



export default Home