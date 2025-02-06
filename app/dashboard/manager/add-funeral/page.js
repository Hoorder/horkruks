import { AddOrderForm } from "./components/AddOrderForm";
import { LastTasks } from "./components/LastTasks";
import styles from "./page.module.css";

export default function AddFuneral() {
    return (
        <>
            <div className={styles.container}>
                <AddOrderForm />
                <LastTasks />
            </div>
        </>
    );
}
