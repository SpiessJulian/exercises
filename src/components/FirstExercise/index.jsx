import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Slider from "../Slider";
import styles from "./styles.module.css";

const UNIT = 15;

const FirstExercise = ({ minValue, maxValue }) => {
	const MIN_VALUE = minValue;
	const MAX_VALUE = maxValue;
	const MID_VALUE = (maxValue - minValue) / 2 + minValue;

	const [scaleBlocks, setScaleBlocks] = useState([]);
	const [sliderBlocks, setSliderBlocks] = useState([]);
	const [startEditValue, setStartEditValue] = useState(MIN_VALUE);
	const [endEditValue, setEndEditValue] = useState(MAX_VALUE);
	const [startEdit, setStartEdit] = useState(false);
	const [endEdit, setEndEdit] = useState(false);
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
			setStart(slot);
		} else if (currentSlider === "max") {
			if (slot <= start) return;
			setEnd(slot);
		}
		setCurrentSlider(null);
	};

	useEffect(() => {
		const scale = [];
		const slider = [];
		let minThumb = null;
		let maxThumb = null;

		for (let i = MIN_VALUE; i <= MAX_VALUE; i++) {
			let label = "";

			if (i == MIN_VALUE || i == MID_VALUE || i == MAX_VALUE) {
				label = i;
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

			if (i === start) {
				minThumb = <Slider onDragStart={onDragStart} name="min" />;
			} else if (i === end) {
				maxThumb = <Slider onDragStart={onDragStart} name="max" />;
			} else {
				minThumb = null;
				maxThumb = null;
			}

			let lineClass = styles.line;

			if (i >= start && i < end) {
				lineClass = clsx(lineClass, styles.lineSelected);
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
	}, [start, end, currentSlider]);

	const handleStartEditMinValue = () => {
		setStartEditValue(start);
		setStartEdit(true);
	}

	const handleEndEditMinValue = (e) => {
		e.preventDefault();
		if (isNaN(startEditValue) || startEditValue > end || startEditValue < MIN_VALUE) return setStartEdit(false);
		setStart(startEditValue);
		setStartEdit(false);
	}

	const handleStartEditMaxValue = () => {
		setEndEditValue(end);
		setEndEdit(true);
	}

	const handleEndEditMaxValue = (e) => {
		e.preventDefault();
		if (isNaN(endEditValue) || endEditValue < start || endEditValue > MAX_VALUE) return setEndEdit(false);
		setEnd(endEditValue);
		setEndEdit(false);
	}

	return (
		<div>
			<h1>First Exercise</h1>

			<div className={styles.container}>
				<form
					onClick={handleStartEditMinValue}
					onSubmit={handleEndEditMinValue}
				>
					{startEdit ? (
						<input
							role="textbox"
							type="number"
							value={startEditValue}
							onChange={(e) => setStartEditValue(Number(e.target.value))}
						/>
					) : (
						`$${start}`
					)}
				</form>
				<div className={styles.sliderContainer}>
					<div className={styles.sliderScale}>{scaleBlocks}</div>
					<div className={styles.slider}>{sliderBlocks}</div>
				</div>
				<form
					onClick={handleStartEditMaxValue}
					onSubmit={handleEndEditMaxValue}
				>
					{endEdit ? (
						<input
							role="textbox"
							type="number"
							value={endEditValue}
							onChange={(e) => setEndEditValue(Number(e.target.value))}
						/>
					) : (
						`$${end}`
					)}
				</form>
			</div>
		</div>
	);
};

export default FirstExercise;
