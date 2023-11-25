import Featured from "@/components/featured/Featured";

import styles from "./page.module.css";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

interface HomePageProps {
  searchParams: {
    page?: string;
    categoryName?: string;
  };
}

export default function Home(props: HomePageProps) {
  const { page, categoryName } = props.searchParams;
  const pageNumber = page ? +page : 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={pageNumber} categoryName={categoryName || ""} />
        <Menu />
      </div>
    </div>
  );
}
