import styles from './Pagination.module.css'

export default function Pagination({page, totalPages, onLeftClick, onRightClick}) {

    return (
    <div>
        <button className={styles.paginationBtn} onClick={onLeftClick}>{"<"}</button>
        <span className={styles.paginationPage}>{page}</span>
        <button className={styles.paginationBtn} onClick={onRightClick}>{">"}</button>
    </div>
  );
}