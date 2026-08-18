import styles from "./page.module.css";
import TopicForm from "./TopicForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Beacon</h1>
        <p>
          A study recommender that suggests which DSA / system-design topic
          to review next.
        </p>
        <p className={styles.placeholder}>
          Coming soon: answer a few questions and get a recommendation.
        </p>
        <TopicForm />
      </main>
    </div>
  );
}
