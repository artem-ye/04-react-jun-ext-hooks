import React, { useRef } from "react";
import CollapseWrapper from "../common/collapse";
import Divider from '../common/divider';
const UseRefExercise = () => {
    const modifiedBlockRef = useRef();
    const handleHomeTask = () => {
        const el = modifiedBlockRef.current;
        el.style.height = '150px';
        el.style.width = '80px';
        el.innerText = 'Foo';
    };

    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть блок, у которого заданы ширина и высота. Добавьте
                кнопку, при нажатии которой изменятся следующие свойства:
            </p>
            <ul>
                <li>Изменится содежимое блока на &quot;text&quot;</li>
                <li>высота и ширина станут равны 150 и 80 соответственно</li>
            </ul>
            <div
                className="bg-primary d-flex flex-row justify-content-center align-items-center rounded"
                style={{
                    height: 40,
                    width: 60,
                    color: "white"
                }}
                ref={modifiedBlockRef}
            >
                <small>Блок</small>
            </div>
            <Divider/>
            <button className="btn btn-danger" onClick={handleHomeTask}>Решение</button>
        </CollapseWrapper>
    );
};

export default UseRefExercise;
