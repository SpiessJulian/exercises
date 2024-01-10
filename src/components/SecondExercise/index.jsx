import React, { useState, useEffect } from "react";
import Slider from "../Slider";
import styles from "./styles.module.css";

const SecondExercise = ({ availableValues = [] }) => {
	const N = availableValues.length;
	const MIN_VALUE = availableValues[0];
	const MAX_VALUE = availableValues[N - 1];

	const [scaleBlocks, setScaleBlocks] = useState([]);
	const [sliderBlocks, setSliderBlocks] = useState([]);
	const [start, setStart] = useState(MIN_VALUE);
	const [end, setEnd] = useState(MAX_VALUE);
	const [currentSlider, setCurrentSlider] = useState(null);

	const onDragStart = (slider) => {
		setCurrentSlider(slider);
	};

	const onDragOver = (e) => {
		e.preventDefault();
	};

	const onDrop = (e) => {
		let slot = Number(e.target.dataset.slot);

		if (isNaN(slot)) return;

		if (currentSlider === "min") {
			if (slot >= end) return;
			const closest = availableValues.reduce(function (prev, curr) {
				return Math.abs(curr - slot) < Math.abs(prev - slot)
					? curr
					: prev;
			});
			setStart(closest);
		} else if (currentSlider === "max") {
			if (slot <= start) return;
			const closest = availableValues.reduce(function (prev, curr) {
				return Math.abs(curr - slot) < Math.abs(prev - slot)
					? curr
					: prev;
			});
			setEnd(closest);
		}
		setCurrentSlider(null);
	};

	useEffect(() => {
		const scale = [];
		const slider = [];
		let minThumb = null;
		let maxThumb = null;
		const { innerWidth } = window;
		const UNIT = innerWidth * 0.006;

		for (
			let i = Math.floor(availableValues[0]);
			i <= Math.ceil(availableValues[N - 1]);
			i++
		) {
			let label = "";
			const closest = availableValues.find((e) => Math.floor(e) === i);
			if (closest) {
				label = closest;
			}

			scale.push(
				<div
					key={i}
					style={{ width: `${UNIT}px` }}
					className={styles.slotScale}
				>
					{label}
				</div>
			);

			if (i === Math.floor(start)) {
				minThumb = <Slider onDragStart={onDragStart} name="min" />;
			} else if (i === Math.floor(end)) {
				maxThumb = <Slider onDragStart={onDragStart} name="max" />;
			} else {
				minThumb = null;
				maxThumb = null;
			}

			let lineClass = styles.line;

			if (i >= start && i < end) {
				lineClass = `${lineClass} ${styles.lineSelected}`;
			}

			slider.push(
				<div
					data-testid={i}
					data-slot={i}
					onDragOver={onDragOver}
					onTouchEnd={onDrop}
					onDrop={onDrop}
					key={i}
					className={styles.slot}
					style={{ width: `${UNIT}px` }}
				>
					<div data-slot={i} className={lineClass} />
					<span className={styles.scaleMark}></span>
					{minThumb}
					{maxThumb}
				</div>
			);
		}

		setScaleBlocks(scale);
		setSliderBlocks(slider);
	}, [start, end, currentSlider, availableValues]);


	return (
		<div>
			<h1>Second Exercise</h1>

			<div className={styles.container}>
				<h3>
					${start}
				</h3>
				<div className={styles.sliderContainer}>
					<div className={styles.sliderScale}>{scaleBlocks}</div>
					<div className={styles.slider}>{sliderBlocks}</div>
				</div>
				<h3>
					${end}
				</h3>
			</div>
		</div>
	);
};

export default SecondExercise;
