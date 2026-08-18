import styles from "./page.module.css";
import TopicForm from "./TopicForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Beacon</h1>
          <p>
            A study recommender that suggests which DSA / system-design
            topic to review next.
          </p>
        </div>
        <TopicForm />
      </main>
    </div>
  );
}
