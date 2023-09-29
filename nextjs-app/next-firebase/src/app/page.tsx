import styles from './page.module.css'

import SimpleForm from '@/components/SimpleForm'


export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Awesome NextJS app</h1>
      <SimpleForm className={styles.simpleForm}></SimpleForm>
    </main>
  )
}
