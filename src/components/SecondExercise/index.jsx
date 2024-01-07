import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Slider from "../Slider";
import styles from "./styles.module.css";

const UNIT = 10;

const SecondExercise = ({ availableValues = [] }) => {
	const N = availableValues.length;
	const MIN_VALUE = availableValues[0];
	const MAX_VALUE = availableValues[N - 1];

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
	}, [start, end, currentSlider, availableValues]);

	const handleStartEditMinValue = () => {
		setStartEditValue(start);
		setStartEdit(true);
	};

	const handleEndEditMinValue = (e) => {
		e.preventDefault();
		if (
			isNaN(startEditValue) ||
			startEditValue > end ||
			startEditValue < MIN_VALUE ||
			!availableValues.includes(startEditValue)
		)
			return setStartEdit(false);
		setStart(startEditValue);
		setStartEdit(false);
	};

	const handleStartEditMaxValue = () => {
		setEndEditValue(end);
		setEndEdit(true);
	};

	const handleEndEditMaxValue = (e) => {
		e.preventDefault();
		if (
			isNaN(endEditValue) ||
			endEditValue < start ||
			endEditValue > MAX_VALUE ||
			!availableValues.includes(endEditValue)
		)
			return setEndEdit(false);
		setEnd(endEditValue);
		setEndEdit(false);
	};

	return (
		<div>
			<h1>Second Exercise</h1>

			<div className={styles.example}>
				<form
					onClick={handleStartEditMinValue}
					onSubmit={handleEndEditMinValue}
				>
					{startEdit ? (
						<input
							role="textbox"
							type="number"
							value={startEditValue}
							onChange={(e) =>
								setStartEditValue(Number(e.target.value))
							}
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

export default SecondExercise;
