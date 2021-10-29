import React from "react";
import CollapseWrapper from "../common/collapse";
const Component = () => {
    return <div>Компонент списка</div>;
};

const ListComponent = ({ children }) => {
    return React.Children.map(children, (el, index) => {
        return (
            <div className="d-flex">
                <span>{ index + 1}</span>&nbsp;{el}
            </div>
        );
    });
};

const ChildrenExercise = () => {
    const component = (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>

            <ListComponent>
                <Component />
                <Component />
                <Component />
            </ListComponent>
        </CollapseWrapper>
    );

    return component;
};

export default ChildrenExercise;
