import React, { useState } from "react";
import CardWrapper from '../common/Card';
import CollapseWrapper from "../common/collapse";
import Divider from '../common/divider';
import SmallTitle from '../common/typografy/smallTitle';
import PropTypes from 'prop-types';

const SimpleComponent = ({ isAuth, onLogIn, onLogOut }) => {
    const logButtonConfig = {
        text: isAuth ? 'Выйти' : 'Войти',
        onClick: isAuth ? onLogOut : onLogIn
    };

    return (
        <>
            <SmallTitle>Exercise / Simple component</SmallTitle>
            <button
                className='btn btn-primary'
                onClick={logButtonConfig.onClick}
            >{logButtonConfig.text}</button>
        </>
    );
};
SimpleComponent.propTypes = {
    isAuth: PropTypes.bool,
    onLogIn: PropTypes.func,
    onLogOut: PropTypes.func
};

const CardWithAuth = ({ children }) => {
    const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('user'));
    const toggleAuth = () => setIsAuth(prev => !prev);

    const childConfig = {
        isAuth: isAuth,
        onLogOut: toggleAuth,
        onLogIn: toggleAuth
    };

    return (
        <CardWrapper>
            {React.cloneElement(children, childConfig)}
        </CardWrapper>
    );
};
CardWithAuth.propTypes = {
    children: PropTypes.node.isRequired
};

const HocExercise = () => {
    return (
        <>
            <CollapseWrapper title="Упражнение">
                <p className="mt-3">
                    Вам необходимо реализовать компонент{" "}
                    <code>SimpleComponent</code>, который:
                </p>
                <ul>
                    <li>
                        Имеет параметры:<code>onLogin</code>, <code>onLogOut</code>,{" "}
                        <code>isAuth</code>
                    </li>
                    <li>
                        Отображайте кнопку <code>Войти</code>, если пользователь НЕ
                        авторизован.
                    </li>
                    <li>
                        Отображает кнопку с содержанием{" "}
                        <code>Выйти из системы</code>, если пользователь
                        авторизован.
                    </li>
                    <li>
                        При нажатии на кнопки вызываются методы <code>onLogin</code>{" "}
                        и <code>onLogOut</code>
                    </li>
                </ul>
                <p className="mt-3">
                    Вам необходимо <code>HOC</code>, который модицифицует компонент{" "}
                    <code>SimpleComponent</code> следующим образом:
                </p>
                <ul>
                    <li>
                        Добавляет обертку в виде карточки boostrap (использовать
                        существующий HOC)
                    </li>
                    <li>
                        Передает параметр <code>isAuth</code>, который является
                        результатом проверки наличия записи с названием{" "}
                        <code>user</code> в <code>localStorage</code>
                    </li>
                    <li>
                        Передает параметр <code>onLogin</code> и{" "}
                        <code>onLogOut</code> для управления записью с названием{" "}
                        <code>user</code> в <code>localStorage</code>
                    </li>
                </ul>
            </CollapseWrapper>
            <Divider/>
            <CardWithAuth>
                <SimpleComponent/>
            </CardWithAuth>
        </>
    );
};

export default HocExercise;
