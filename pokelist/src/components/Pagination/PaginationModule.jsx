import styles from './PaginationModule.module.css'
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationModule({page, totalPages, onLeftClick, onRightClick}) {
    return (
    <div>
        <Pagination className={styles.paginationContainer}>
          <Pagination.Prev className={styles.paginationBtn} onClick={onLeftClick} />
            <Pagination.Item active>{page} of {totalPages}</Pagination.Item>
          <Pagination.Next className={styles.paginationBtn} onClick={onRightClick}/>
        </Pagination>
    </div>
  );
}