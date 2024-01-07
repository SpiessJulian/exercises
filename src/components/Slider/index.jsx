import React from "react";
import styles from './styles.module.css';

const Slider = ({ onDragStart, name }) => {
	return (
		<div
            data-testid='slider'
			onDragStart={() => onDragStart(name)}
			onTouchStart={() => onDragStart(name)}
			draggable
			className={styles.sliderThumb}
		></div>
	);
};

export default Slider;
