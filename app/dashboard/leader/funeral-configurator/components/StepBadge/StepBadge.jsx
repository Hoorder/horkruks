import styles from "./StepBadge.module.css";

export function StepBadge({stepNumber, stepTitle}) {
    return (
        <div className={styles.stepContainer}>
            <div className={styles.stepNumber}>{stepNumber}</div>
            <div className={styles.stepNumberName}>{stepTitle}</div>
        </div>
    );
}
