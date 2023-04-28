import styles from "./Paginado.module.css";

export const Paginado = ({
  cardsPerPage,
  allDogs,
  paginado,
  prevPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className={styles.centerPagination}>
        <div className={styles.number} onClick={prevPage}>
          «
        </div>
        {pageNumbers.map((number) => (
          <div
            className={currentPage === number ? styles.currentPage : styles.number}
            key={number}
            onClick={() => paginado(number)}
          >
            {number}
          </div>
        ))}
        <div className={styles.number} onClick={nextPage}>
          »
        </div>
      </div>
    </nav>
  );
};